'use client'

import { useState } from 'react'

export default function DashboardPage() {
  const [isListeningToAdvisory, setIsListeningToAdvisory] = useState(false)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const [whatsappEnabled, setWhatsappEnabled] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN')
  const [whatsappVoiceUrl, setWhatsappVoiceUrl] = useState(null)
  const [cacheHits, setCacheHits] = useState(0)

  /**
   * LANGUAGE OPTIONS
   * Supported regional languages for TTS
   */
  const languages = [
    { code: 'en-IN', label: 'English (India)', voice: 'en-IN-Neural2-C' },
    { code: 'hi-IN', label: 'हिंदी (Hindi)', voice: 'hi-IN-Neural2-C' },
    { code: 'ta-IN', label: 'தமிழ் (Tamil)', voice: 'ta-IN-Neural2-C' },
    { code: 'te-IN', label: 'తెలుగు (Telugu)', voice: 'te-IN-Neural2-C' },
    { code: 'kn-IN', label: 'ಕನ್ನಡ (Kannada)', voice: 'kn-IN-Neural2-C' },
  ]

  /**
   * AUDIO CACHING UTILITIES
   * LocalStorage-based caching to reduce API calls
   */
  const createCacheKey = (text, language) => {
    const encoded = btoa(`${text}|${language}`)
    return `tts_audio_${encoded.substring(0, 50)}`
  }

  const getCachedAudio = (text, language) => {
    try {
      const key = createCacheKey(text, language)
      const cached = localStorage.getItem(key)
      if (cached) {
        setCacheHits(prev => prev + 1)
        return cached
      }
    } catch (error) {
      console.warn('Cache read error:', error)
    }
    return null
  }

  const setCachedAudio = (text, language, audioBase64) => {
    try {
      const key = createCacheKey(text, language)
      localStorage.setItem(key, audioBase64)
    } catch (error) {
      console.warn('Cache write error:', error)
    }
  }

  /**
   * HANDLE VOICE ADVISORY PLAYBACK
   * Sends advisory text to TTS API with language selection
   * Checks cache before making API call
   */
  const handlePlayAdvisory = async () => {
    // If already playing, stop it
    if (isListeningToAdvisory) {
      setIsListeningToAdvisory(false)
      return
    }

    setIsLoadingAudio(true)

    try {
      // Check cache first
      const cachedAudio = getCachedAudio(todaysAdvisory.action, selectedLanguage)
      let audioContent = cachedAudio

      // If not cached, fetch from API
      if (!audioContent) {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: todaysAdvisory.action,
            language: selectedLanguage, // Send selected language
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to generate audio')
        }

        const data = await response.json()
        audioContent = data.audioContent

        // Cache the audio for next time
        setCachedAudio(todaysAdvisory.action, selectedLanguage, audioContent)
      }

      // Decode base64 audio content
      const binaryString = atob(audioContent)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      // Create blob and play using HTML5 Audio API
      const audioBlob = new Blob([bytes], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(audioBlob)

      // Store for WhatsApp sharing
      setWhatsappVoiceUrl(audioUrl)

      // Create and play audio element
      const audio = new Audio(audioUrl)
      audio.onplay = () => setIsListeningToAdvisory(true)
      audio.onended = () => {
        setIsListeningToAdvisory(false)
        URL.revokeObjectURL(audioUrl) // Clean up
      }
      audio.onerror = () => {
        console.error('Audio playback error')
        setIsListeningToAdvisory(false)
      }

      audio.play()
    } catch (error) {
      console.error('Audio playback failed:', error)
      setIsListeningToAdvisory(false)
      alert('Unable to play audio. Please check your connection.')
    } finally {
      setIsLoadingAudio(false)
    }
  }

  /**
   * HANDLE WHATSAPP VOICE ADVISORY SHARING
   * Sends voice advisory via WhatsApp to farmer's phone
   */
  const handleShareViaWhatsApp = async () => {
    if (!whatsappVoiceUrl) {
      alert('Please listen to the advisory first')
      return
    }
    // In production, this would send to Twilio WhatsApp API
    // For hackathon demo, show the sharing capability
    const phoneNumber = prompt('Enter phone number (with +91):', '+91')
    if (phoneNumber) {
      console.log(`Sharing voice advisory to ${phoneNumber}`)
      alert(`Voice advisory shared via WhatsApp! Farmer will receive: ${todaysAdvisory.action}`)
    }
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Inline styles for Google Console aesthetic */}
      <style jsx>{`
        body {
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
          background-color: #f8f9fa;
          color: #202124;
        }
        .severity-dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 8px;
        }
        .severity-green { background-color: #188038; }
        .severity-amber { background-color: #F29900; }
        .severity-red { background-color: #D93025; }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* HEADER */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '500', margin: '0 0 8px 0', color: '#202124', letterSpacing: '-0.5px' }}>
              Crop Stress Dashboard
            </h1>
            <p style={{ fontSize: '14px', color: '#5f6368', margin: '0' }}>
              Real-time monitoring and climate-informed stress assessment for precision agriculture
            </p>
          </div>

          {/* Header Controls */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Language Selector */}
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '8px 12px' }}>
              <span style={{ marginRight: '8px', fontSize: '18px' }}>🌐</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#202124',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* WhatsApp Toggle */}
            <button
              onClick={() => setWhatsappEnabled(!whatsappEnabled)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: whatsappEnabled ? '#25d366' : '#1164e8',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 200ms',
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              <span style={{ fontSize: '16px' }}>{whatsappEnabled ? '✓' : '💬'}</span>
              WhatsApp {whatsappEnabled ? 'On' : 'Off'}
            </button>
          </div>
        </header>

        {/* STATUS SUMMARY BAR */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '6px', overflow: 'hidden', marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            {/* Crop */}
            <div style={{ padding: '16px', borderRight: '1px solid #e0e0e0' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.3px', marginBottom: '4px' }}>CROP</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#202124' }}>{statusSummary.crop}</div>
            </div>
            
            {/* Stage */}
            <div style={{ padding: '16px', borderRight: '1px solid #e0e0e0' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.3px', marginBottom: '4px' }}>STAGE</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#202124' }}>{statusSummary.stage}</div>
            </div>
            
            {/* Stress */}
            <div style={{ padding: '16px', borderRight: '1px solid #e0e0e0' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.3px', marginBottom: '4px' }}>STRESS</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#d97706' }}>{statusSummary.stress}</div>
            </div>
            
            {/* Severity */}
            <div style={{ padding: '16px', borderRight: '1px solid #e0e0e0' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.3px', marginBottom: '4px' }}>SEVERITY</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#202124', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="severity-dot severity-amber"></span>
                {statusSummary.severity}
              </div>
            </div>
            
            {/* Confidence */}
            <div style={{ padding: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.3px', marginBottom: '4px' }}>CONFIDENCE</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#202124' }}>{statusSummary.confidence}</div>
            </div>
          </div>
        </div>

        {/* ADVISORY CARD */}
        <div style={{
          backgroundColor: '#e8f0fe',
          border: '1px solid #e0e0e0',
          borderLeft: '6px solid #f29900',
          borderRadius: '6px',
          padding: '24px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '24px',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '20px' }}>⚠️</span>
              <p style={{ fontSize: '15px', fontWeight: '600', color: '#202124', margin: '0' }}>
                Recommended Action: {advisoryData.action}
              </p>
            </div>
            <p style={{ fontSize: '13px', color: '#5f6368', lineHeight: '1.5', margin: '0 0 8px 0' }}>
              <strong style={{ color: '#202124' }}>Timing:</strong> {advisoryData.timing}
            </p>
            <p style={{ fontSize: '13px', color: '#5f6368', lineHeight: '1.5', margin: '0' }}>
              <strong style={{ color: '#202124' }}>Reasoning:</strong> {advisoryData.reasoning}
            </p>
          </div>
          
          <button
            onClick={handlePlayAdvisory}
            disabled={isLoadingAudio}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              backgroundColor: 'transparent',
              color: '#1164e8',
              border: 'none',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              textDecoration: isListeningToAdvisory ? 'underline' : 'none',
            }}
          >
            <span style={{ fontSize: '16px' }}>🔊</span>
            {isLoadingAudio ? 'Loading...' : isListeningToAdvisory ? 'Stop' : 'Listen to Advisory'}
          </button>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
          {/* LEFT COLUMN */}
          <div>
            {/* Crop Details */}
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '13px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.3px', margin: '0 0 16px 0', textTransform: 'uppercase' }}>
                Crop Details &amp; Metadata
              </h2>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '6px', overflow: 'hidden' }}>
                {cropDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '16px',
                      borderBottom: idx < cropDetails.length - 1 ? '1px solid #e0e0e0' : 'none',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: '#5f6368' }}>{detail.label}</span>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#202124' }}>{detail.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Explainability */}
            <section>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '6px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '18px' }}>⚙️</span>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#202124', margin: '0' }}>
                    Why this alert was generated
                  </h3>
                </div>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#5f6368', margin: '0 0 16px 0' }}>
                  {explainabilityData.description}
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {explainabilityData.sources.map((source, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#f1f3f4',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                        color: '#5f6368',
                        textTransform: 'uppercase',
                      }}
                    >
                      <span style={{ fontSize: '14px' }}>
                        {source.icon === 'satellite_alt' ? '🛰️' : source.icon === 'sensors' ? '📡' : '🌡️'}
                      </span>
                      {source.label}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN - STRESS HISTORY */}
          <div>
            <h2 style={{ fontSize: '13px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.3px', margin: '0 0 16px 0', textTransform: 'uppercase' }}>
              Stress History
            </h2>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '6px', padding: '24px' }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Vertical timeline line */}
                <div
                  style={{
                    position: 'absolute',
                    left: '5px',
                    top: '0',
                    bottom: '0',
                    width: '1px',
                    backgroundColor: '#e0e0e0',
                  }}
                ></div>

                {/* Timeline items */}
                {stressHistory.map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', paddingLeft: '32px' }}>
                    {/* Dot */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '0',
                        top: '6px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: getSeverityColor(item.severity),
                        border: '4px solid #ffffff',
                        boxSizing: 'border-box',
                      }}
                    ></div>

                    {/* Content */}
                    <div style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {item.date}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#202124', marginBottom: '4px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#5f6368' }}>
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '24px',
                  border: '1px solid #e0e0e0',
                  backgroundColor: 'transparent',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#5f6368',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  transition: 'background-color 200ms',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                View Full History
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 0',
          borderTop: '1px solid #e0e0e0',
        }}>
          <p style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.5px', margin: '0', textTransform: 'uppercase' }}>
            POWERED BY PRECISIONAG FUSION ENGINE V4.2
          </p>
          <button
            style={{
              padding: '6px 16px',
              backgroundColor: '#e0e0e0',
              border: 'none',
              fontSize: '12px',
              fontWeight: '600',
              color: '#202124',
              cursor: 'pointer',
              borderRadius: '4px',
              textTransform: 'uppercase',
              transition: 'background-color 200ms',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#d0d0d0'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#e0e0e0'}
          >
            Help &amp; Documentation
          </button>
        </footer>
      </div>
    </div>
  )
}
            <button
              key={item.id}
              className={`${styles.navItem} ${activeNav === item.id ? styles.navItemActive : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className={styles.navLabel}>{item.label}</span>
              {activeNav === item.id && <div className={styles.navIndicator}></div>}
            </button>
          ))}
        </nav>

        {/* User Info Footer */}
        <div className={styles.sidebarFooter}>
          <div className={styles.userAvatar}>A</div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Admin User</div>
            <div className={styles.userRole}>Farm Manager</div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className={styles.mainContent}>
        {/* SECTION 1: PAGE HEADER */}
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Crop Stress Dashboard</h1>
          <p className={styles.pageSubtitle}>
            Real-time monitoring and climate-informed stress assessment for precision agriculture
          </p>
        </header>

        {/* SECTION 2: STATUS SUMMARY BAR */}
        {/* Horizontal card showing 6 key metrics with vertical dividers */}
        <div className={styles.statusSummaryBar}>
          <div className={styles.statusItem}>
            <div className={styles.statusLabel}>Crop</div>
            <div className={styles.statusValue}>{statusSummary.crop}</div>
          </div>

          <div className={styles.statusDivider}></div>

          <div className={styles.statusItem}>
            <div className={styles.statusLabel}>Growth Stage</div>
            <div className={styles.statusValue}>{statusSummary.growthStage}</div>
          </div>

          <div className={styles.statusDivider}></div>

          <div className={styles.statusItem}>
            <div className={styles.statusLabel}>Current Stress</div>
            <div className={styles.statusValue}>{statusSummary.currentStress}</div>
          </div>

          <div className={styles.statusDivider}></div>

          <div className={styles.statusItem}>
            <div className={styles.statusLabel}>Severity</div>
            <div className={`${styles.statusValue} ${styles.statusValueWithDot}`}>
              <span className={`${styles.severityDot} ${getSeverityClass(statusSummary.severity)}`}></span>
              <span>{statusSummary.severity.charAt(0).toUpperCase() + statusSummary.severity.slice(1)}</span>
            </div>
          </div>

          <div className={styles.statusDivider}></div>

          <div className={styles.statusItem}>
            <div className={styles.statusLabel}>Confidence</div>
            <div className={styles.statusValue}>{statusSummary.confidence}</div>
          </div>
        </div>

        {/* SECTION 3: TODAY'S ADVISORY (PRIMARY HIGHLIGHTED CARD) */}
        <section className={styles.advisorySection}>
          {/* LANGUAGE SELECTOR - Regional language support */}
          <div className={styles.languageSelector}>
            <label htmlFor="language-select" className={styles.languageSelectorLabel}>
              Language:
            </label>
            <select
              id="language-select"
              className={styles.languageSelect}
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
            <span className={styles.cacheIndicator}>
              Cache hits: {cacheHits}
            </span>
          </div>

          <div className={styles.advisoryCard}>
            <div className={styles.advisoryHeader}>
              <h2 className={styles.advisoryTitle}>{todaysAdvisory.title}</h2>
              <div className={styles.advisoryActions}>
                {/* VOICE ADVISORY BUTTON - Triggers TTS playback */}
                <button
                  className={`${styles.voiceButton} ${isListeningToAdvisory ? styles.voiceButtonActive : ''}`}
                  onClick={handlePlayAdvisory}
                  disabled={isLoadingAudio}
                  aria-label="Listen to advisory"
                  title="Listen to advisory in selected language"
                >
                  <span className={styles.voiceButtonText}>
                    {isLoadingAudio ? 'Loading...' : isListeningToAdvisory ? 'Stop' : 'Listen'}
                  </span>
                </button>

                {/* WHATSAPP SHARE BUTTON - Share voice advisory */}
                <button
                  className={styles.whatsappShareButton}
                  onClick={handleShareViaWhatsApp}
                  disabled={!whatsappVoiceUrl || isLoadingAudio}
                  aria-label="Share via WhatsApp"
                  title="Share voice advisory via WhatsApp"
                >
                  <span className={styles.whatsappShareText}>Share</span>
                </button>
              </div>
            </div>
            
            <div className={styles.advisoryAction}>{todaysAdvisory.action}</div>
            <div className={styles.advisoryTiming}>
              <span className={styles.timingLabel}>Timing:</span> {todaysAdvisory.timing}
            </div>
            <div className={styles.advisoryDivider}></div>
            <div className={styles.advisoryReason}>{todaysAdvisory.reason}</div>
            
            {/* VOICE ADVISORY HELPER TEXT - Indicates audio availability */}
            <div className={styles.advisoryHelper}>
              <span className={styles.helperText}>Audio guidance available in local language</span>
            </div>
          </div>
        </section>

        {/* SECTION 4: CROP DETAILS (Standard Card) */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Crop Details</h2>
          <div className={styles.card}>
            <div className={styles.detailsList}>
              {cropDetails.map((detail, index) => (
                <div
                  key={index}
                  className={`${styles.detailRow} ${index !== cropDetails.length - 1 ? styles.detailRowBorder : ''}`}
                >
                  <div className={styles.detailLabel}>{detail.label}</div>
                  <div className={styles.detailValue}>{detail.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: STRESS HISTORY (Timeline Card) */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Stress History</h2>
          <div className={styles.card}>
            <div className={styles.timelineContainer}>
              {stressHistory.map((event) => (
                <div key={event.id} className={styles.timelineEvent}>
                  {/* Marker column: colored dot with vertical line */}
                  <div className={styles.timelineMarker}>
                    <div className={`${styles.timelineDot} ${getSeverityClass(event.severity)}`}></div>
                    {event.id < stressHistory.length && <div className={styles.timelineLine}></div>}
                  </div>

                  {/* Content column: date, stress type, description */}
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <span className={styles.timelineDate}>{event.date}</span>
                      <span className={`${styles.timelineSeverity} ${getSeverityClass(event.severity)}`}>
                        {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                      </span>
                    </div>
                    <div className={styles.timelineStressType}>{event.stressType}</div>
                    <div className={styles.timelineDescription}>{event.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: EXPLAINABILITY NOTE (Minimal Card) */}
        <section className={styles.section}>
          <div className={styles.explainabilityCard}>
            <h3 className={styles.explainabilityTitle}>Why this alert was generated</h3>
            <p className={styles.explainabilityText}>
              This water stress alert is based on satellite-derived soil moisture data combined with local weather patterns.
              The current vegetative growth stage requires consistent moisture levels. Our climate model detected decreasing
              soil moisture over the past 48 hours, combined with forecasted dry conditions for the next week.
            </p>
          </div>
        </section>

        {/* SECTION 7: WHATSAPP ALERTS (NEW - Communication Preferences) */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Alerts & Notifications</h2>
          <div className={styles.card}>
            {/* WHATSAPP ALERT TOGGLE - Minimal, accessible opt-in */}
            <div className={styles.whatsappAlertContainer}>
              <div className={styles.whatsappAlertContent}>
                <h3 className={styles.whatsappTitle}>WhatsApp Stress Alerts</h3>
                <p className={styles.whatsappDescription}>
                  Receive critical crop stress updates directly on WhatsApp
                </p>
              </div>
              
              {/* Toggle Switch */}
              <div className={styles.toggleWrapper}>
                <button
                  className={`${styles.toggle} ${whatsappEnabled ? styles.toggleOn : styles.toggleOff}`}
                  onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                  role="switch"
                  aria-checked={whatsappEnabled}
                  aria-label="Enable WhatsApp alerts"
                >
                  <span className={styles.toggleIndicator}></span>
                </button>
              </div>
            </div>
            
            {/* STATUS MESSAGE - Shows when enabled */}
            {whatsappEnabled && (
              <div className={styles.enablementMessage}>
                <p className={styles.enablementText}>
                  You will receive WhatsApp messages for high-priority stress alerts. Update your phone number in settings.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
