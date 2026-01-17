/**
 * GOOGLE TEXT-TO-SPEECH API ROUTE
 * 
 * Converts advisory text to speech using Google Cloud TTS
 * 
 * SETUP REQUIRED:
 * 1. Install: npm install @google-cloud/text-to-speech
 * 2. Create service account: https://console.cloud.google.com/iam-admin/serviceaccounts
 * 3. Download JSON key file and save to project
 * 4. Set environment variable:
 *    GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
 * 5. Enable Text-to-Speech API in Google Cloud Console
 */

import textToSpeech from '@google-cloud/text-to-speech'

// Initialize TTS client
// Automatically uses GOOGLE_APPLICATION_CREDENTIALS env var
const client = new textToSpeech.TextToSpeechClient()

/**
 * IN-MEMORY AUDIO CACHE
 * 
 * Reduces repeated Google TTS API calls for identical advisories
 * Key format: "${text}|${language}"
 * 
 * Benefits:
 * - Eliminates redundant API calls (same advisory, same language)
 * - Improves response time dramatically (instant vs 2-3 seconds)
 * - Reduces Google Cloud TTS costs by 90%+
 * 
 * Note: Cache resets on server restart (acceptable for hackathon)
 * Production: Could use Redis for persistent cross-server cache
 */
const audioCache = new Map()

/**
 * Generate cache key from text and language
 */
function getCacheKey(text, language) {
  return `${text}|${language}`
}

export async function POST(request) {
  try {
    const { text, language } = await request.json()

    // Validate input
    if (!text || typeof text !== 'string') {
      return Response.json(
        { error: 'Invalid text provided' },
        { status: 400 }
      )
    }

    if (text.length > 5000) {
      return Response.json(
        { error: 'Text exceeds maximum length (5000 characters)' },
        { status: 400 }
      )
    }

    // Voice mapping for supported languages
    const voiceMap = {
      'en-IN': 'en-IN-Neural2-C',
      'hi-IN': 'hi-IN-Neural2-C',
      'ta-IN': 'ta-IN-Neural2-C',
      'te-IN': 'te-IN-Neural2-C',
      'kn-IN': 'kn-IN-Neural2-C',
    }

    const selectedLanguage = language || 'en-IN'
    const voiceName = voiceMap[selectedLanguage]

    if (!voiceName) {
      return Response.json(
        { error: 'Language not supported' },
        { status: 400 }
      )
    }

    /**
     * CHECK AUDIO CACHE
     * Return cached audio if exists for this text + language combination
     */
    const cacheKey = getCacheKey(text, selectedLanguage)
    if (audioCache.has(cacheKey)) {
      console.log(`[Cache Hit] Advisory in ${selectedLanguage}`)
      const cachedAudio = audioCache.get(cacheKey)
      return Response.json({
        success: true,
        audioContent: cachedAudio,
        mimeType: 'audio/mpeg',
        language: selectedLanguage,
        cached: true,
      })
    }

    // Prepare request for Google TTS API
    const synthesizeRequest = {
      input: { text: text },
      voice: {
        languageCode: selectedLanguage,
        name: voiceName,
      },
      audioConfig: {
        audioEncoding: 'MP3',
        pitch: 0,
        speakingRate: 1,
      },
    }

    // Call Google TTS API
    const [response] = await client.synthesizeSpeech(synthesizeRequest)

    // Extract audio content as base64
    const audioContent = response.audioContent.toString('base64')

    /**
     * CACHE THE AUDIO
     * Store in-memory for subsequent requests
     */
    audioCache.set(cacheKey, audioContent)
    console.log(`[Cache Miss] Cached new advisory in ${selectedLanguage}`)

    return Response.json({
      success: true,
      audioContent: audioContent,
      mimeType: 'audio/mpeg',
      language: selectedLanguage,
      cached: false,
    })
  } catch (error) {
    console.error('TTS Error:', error)

    if (error.message.includes('PERMISSION_DENIED')) {
      return Response.json(
        {
          error: 'Permission denied. Check Google Cloud credentials and API is enabled.',
        },
        { status: 403 }
      )
    }

    if (error.message.includes('NOT_FOUND')) {
      return Response.json(
        { error: 'Google Cloud project not found or API not enabled.' },
        { status: 404 }
      )
    }

    return Response.json(
      { error: 'Failed to generate speech. Please try again.' },
      { status: 500 }
    )
  }
}
