'use client'

import { useState, useEffect } from 'react'
import { getWeatherData, getWeatherEmoji } from '../services/weatherService'
import { ProtectedRoute } from '../components/ProtectedRoute'

// Set this to true to use the new professional dashboard
const USE_PROFESSIONAL_DASHBOARD = false

function DashboardContent() {
  // If using professional dashboard, render it
  if (USE_PROFESSIONAL_DASHBOARD) {
    return <ProfessionalDashboard />
  }
  const [isListeningToAdvisory, setIsListeningToAdvisory] = useState(false)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const [whatsappEnabled, setWhatsappEnabled] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN')
  const [whatsappVoiceUrl, setWhatsappVoiceUrl] = useState(null)
  const [cacheHits, setCacheHits] = useState(0)
  const [weatherData, setWeatherData] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)

  // Ludhiana, India coordinates (default location)
  const FARM_LATITUDE = 30.9010
  const FARM_LONGITUDE = 75.8573

  // Fetch weather data on component mount
  useEffect(() => {
    const fetchWeather = async () => {
      setWeatherLoading(true)
      try {
        const data = await getWeatherData(FARM_LATITUDE, FARM_LONGITUDE)
        setWeatherData(data)
      } catch (error) {
        console.error('Failed to fetch weather:', error)
      } finally {
        setWeatherLoading(false)
      }
    }

    fetchWeather()
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const languages = [
    { code: 'en-IN', label: 'English (US)', voice: 'en-IN-Neural2-C' },
    { code: 'hi-IN', label: 'हिंदी (Hindi)', voice: 'hi-IN-Neural2-C' },
    { code: 'ta-IN', label: 'தமிழ் (Tamil)', voice: 'ta-IN-Neural2-C' },
    { code: 'te-IN', label: 'తెలుగు (Telugu)', voice: 'te-IN-Neural2-C' },
    { code: 'kn-IN', label: 'ಕನ್ನಡ (Kannada)', voice: 'kn-IN-Neural2-C' },
  ]

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

  const handlePlayAdvisory = async () => {
    if (isListeningToAdvisory) {
      setIsListeningToAdvisory(false)
      return
    }

    setIsLoadingAudio(true)

    try {
      const cachedAudio = getCachedAudio(advisoryData.action, selectedLanguage)
      let audioContent = cachedAudio

      if (!audioContent) {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: advisoryData.action,
            language: selectedLanguage,
          }),
        })

        if (!response.ok) throw new Error('Failed to generate audio')

        const data = await response.json()
        audioContent = data.audioContent
        setCachedAudio(advisoryData.action, selectedLanguage, audioContent)
      }

      const binaryString = atob(audioContent)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      const audioBlob = new Blob([bytes], { type: 'audio/mpeg' })
      const audioUrl = URL.createObjectURL(audioBlob)
      setWhatsappVoiceUrl(audioUrl)

      const audio = new Audio(audioUrl)
      audio.onplay = () => setIsListeningToAdvisory(true)
      audio.onended = () => {
        setIsListeningToAdvisory(false)
        URL.revokeObjectURL(audioUrl)
      }
      audio.onerror = () => setIsListeningToAdvisory(false)
      audio.play()
    } catch (error) {
      console.error('Audio playback failed:', error)
      setIsListeningToAdvisory(false)
      alert('Unable to play audio. Please check your connection.')
    } finally {
      setIsLoadingAudio(false)
    }
  }

  const handleShareViaWhatsApp = async () => {
    if (!whatsappVoiceUrl) {
      alert('Please listen to the advisory first')
      return
    }
    const phoneNumber = prompt('Enter phone number (with +91):', '+91')
    if (phoneNumber) {
      console.log(`Sharing voice advisory to ${phoneNumber}`)
      alert(`Voice advisory shared via WhatsApp!`)
    }
  }

  const statusSummary = {
    crop: 'Wheat',
    stage: 'Tillering',
    stress: 'Moisture Stress',
    severity: 'Medium',
    confidence: '89%',
  }

  const advisoryData = {
    action: 'Increase irrigation frequency by 20% for 48 hours.',
    timing: 'Immediate',
    reasoning: 'Soil moisture at 15cm is below 35% thresholds.',
  }

  const explainabilityData = {
    description: 'This advisory is a result of a multi-model fusion. We integrated live volumetric water content data from localized 15cm moisture sensors with the latest Sentinel-2 NDVI satellite imagery, which indicates a subtle drop in chlorophyll reflectance. Furthermore, the local 48-hour forecast predicts a heat spike exceeding 32°C.',
    sources: [
      { icon: 'satellite_alt', label: 'Satellite Imagery' },
      { icon: 'sensors', label: 'Ground Sensors' },
      { icon: 'thermostat', label: 'Weather Forecast' },
    ],
  }

  const stressHistory = [
    { date: 'Dec 20, 2023', title: 'Moisture Stress Detected', description: 'Severity: Medium', severity: 'amber' },
    { date: 'Dec 15, 2023', title: 'Optimal Health Stable', description: 'Confidence: 94%', severity: 'green' },
    { date: 'Dec 10, 2023', title: 'Fertigation Applied', description: 'Scheduled maintenance completed', severity: 'green' },
    { date: 'Dec 02, 2023', title: 'Field Mapping Initialized', description: 'Initial assessment complete', severity: 'green' },
  ]

  const getSeverityColor = (severity) => {
    const colors = { green: '#34a853', amber: '#ffb300', red: '#d93025' }
    return colors[severity] || '#5f6368'
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <style jsx>{`
        .vertical-divider {
          width: 1px;
          height: 24px;
          background-color: #e0e0e0;
        }
        .timeline-line {
          width: 1px;
          background-color: #e0e0e0;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 7px;
        }
        .severity-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 8px; }
        .severity-green { background-color: #34a853; }
        .severity-amber { background-color: #ffb300; }
        .severity-red { background-color: #d93025; }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* HEADER */}
        <header style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '500', margin: '0 0 8px 0', color: '#202124', letterSpacing: '-0.5px' }}>
            Crop Stress Dashboard
          </h1>
          <p style={{ fontSize: '14px', color: '#5f6368', margin: '0' }}>
            Real-time monitoring and climate-informed stress assessment for precision agriculture
          </p>
        </header>

        {/* STATUS SUMMARY BAR */}
        <div style={{ 
          backgroundColor: '#ffffff', 
          border: '1px solid #e0e0e0', 
          borderRadius: '6px', 
          padding: '16px', 
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.3px', marginBottom: '4px', textTransform: 'uppercase' }}>Crop</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#202124' }}>{statusSummary.crop}</span>
            </div>
            <div className="vertical-divider"></div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.3px', marginBottom: '4px', textTransform: 'uppercase' }}>Stage</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#202124' }}>{statusSummary.stage}</span>
            </div>
            <div className="vertical-divider"></div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.3px', marginBottom: '4px', textTransform: 'uppercase' }}>Stress</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#202124' }}>{statusSummary.stress}</span>
            </div>
            <div className="vertical-divider"></div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.3px', marginBottom: '4px', textTransform: 'uppercase' }}>Severity</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="severity-dot severity-amber"></span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#202124' }}>Medium</span>
              </div>
            </div>
            <div className="vertical-divider"></div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.3px', marginBottom: '4px', textTransform: 'uppercase' }}>Confidence</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#202124' }}>{statusSummary.confidence}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5f6368', fontSize: '12px' }}>
            <span>🔄</span>
            <span>Last updated 4m ago</span>
          </div>
        </div>

        {/* ADVISORY CARD */}
        <div style={{
          backgroundColor: '#e8f0fe', 
          border: '1px solid #e0e0e0', 
          borderLeft: '4px solid #ffb300', 
          borderRadius: '6px',
          padding: '20px', 
          marginBottom: '24px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          gap: '24px',
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '15px', fontWeight: '600', color: '#1a73e8', margin: '0 0 8px 0' }}>
              Recommended Action: {advisoryData.action}
            </p>
            <p style={{ fontSize: '13px', color: '#3c4043', lineHeight: '1.5', margin: '0' }}>
              <strong style={{ color: '#202124' }}>Timing:</strong> {advisoryData.timing}. 
              <span style={{ marginLeft: '16px' }}></span>
              <strong style={{ color: '#202124' }}>Reasoning:</strong> {advisoryData.reasoning}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 'fit-content' }}>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #e0e0e0', 
                borderRadius: '4px', 
                padding: '6px 10px',
                fontSize: '13px', 
                fontWeight: '500', 
                color: '#202124', 
                cursor: 'pointer', 
                outline: 'none'
              }}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
            <button
              onClick={handlePlayAdvisory}
              disabled={isLoadingAudio}
              style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                padding: '8px 14px',
                backgroundColor: '#1164e8', 
                color: '#ffffff', 
                border: 'none', 
                fontSize: '13px',
                fontWeight: '600', 
                cursor: 'pointer', 
                borderRadius: '4px',
                opacity: isLoadingAudio ? 0.7 : 1,
              }}
            >
              <span style={{ fontSize: '16px' }}>🔊</span>
              {isLoadingAudio ? 'Loading...' : 'Listen to Advisory'}
            </button>
          </div>
        </div>

        {/* MAIN GRID - 12 COLUMN LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px', marginBottom: '32px' }}>
          {/* LEFT COLUMN: 8 COLS */}
          <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Crop Details Grid */}
            <section>
              <h3 style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.5px', margin: '0 0 12px 0', textTransform: 'uppercase' }}>
                Crop Details
              </h3>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #e0e0e0' }}>
                  <div style={{ padding: '16px', borderRight: '1px solid #e0e0e0' }}>
                    <p style={{ fontSize: '11px', color: '#5f6368', fontWeight: '500', margin: '0 0 4px 0' }}>Crop Type</p>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#202124', margin: '0' }}>Bread Wheat (HD-2967)</p>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ fontSize: '11px', color: '#5f6368', fontWeight: '500', margin: '0 0 4px 0' }}>Sowing Date</p>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#202124', margin: '0' }}>Nov 12, 2023</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #e0e0e0' }}>
                  <div style={{ padding: '16px', borderRight: '1px solid #e0e0e0' }}>
                    <p style={{ fontSize: '11px', color: '#5f6368', fontWeight: '500', margin: '0 0 4px 0' }}>Days After Sowing</p>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#202124', margin: '0' }}>42 Days</p>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ fontSize: '11px', color: '#5f6368', fontWeight: '500', margin: '0 0 4px 0' }}>Soil Type</p>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#202124', margin: '0' }}>Silty Clay</p>
                  </div>
                </div>
                <div style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
                  <p style={{ fontSize: '11px', color: '#5f6368', fontWeight: '500', margin: '0 0 4px 0' }}>Location</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px' }}>📍</span>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#202124', margin: '0' }}>Plot B-12, Ludhiana</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Explainability */}
            <section>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '6px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '18px' }}>ℹ️</span>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#202124', margin: '0' }}>
                    Why this alert was generated
                  </h3>
                </div>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#5f6368', margin: '0 0 12px 0' }}>
                  This advisory is a result of a multi-model fusion. We integrated live volumetric water content data from localized 15cm moisture sensors with the latest Sentinel-2 NDVI satellite imagery, which indicates a subtle drop in chlorophyll reflectance. Furthermore, the local 48-hour forecast predicts a heat spike exceeding 32°C.
                </p>
              </div>
            </section>

            {/* Data Sources Section */}
            <section>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '6px', padding: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#202124', margin: '0 0 20px 0' }}>Data Sources Used</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Weather Data */}
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ marginTop: '4px', fontSize: '18px' }}>☁️</div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#202124', margin: '0 0 4px 0' }}>Weather Data (Source: OpenWeather / IMD)</p>
                      <p style={{ fontSize: '12px', color: '#5f6368', margin: '0' }}>Historical, current, and forecast weather data used for climate stress analysis.</p>
                    </div>
                  </div>
                  
                  {/* Soil & Land Data */}
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ marginTop: '4px', fontSize: '18px' }}>🌍</div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#202124', margin: '0 0 4px 0' }}>Soil & Land Data (Source: SoilGrids / Soil Health Card)</p>
                      <p style={{ fontSize: '12px', color: '#5f6368', margin: '0' }}>Soil texture, moisture holding capacity, and pH reference data.</p>
                    </div>
                  </div>
                  
                  {/* Crop Growth Model */}
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ marginTop: '4px', fontSize: '18px' }}>📊</div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#202124', margin: '0 0 4px 0' }}>Crop Growth Model (Source: Agronomic crop-stage rules)</p>
                      <p style={{ fontSize: '12px', color: '#5f6368', margin: '0' }}>Stage-wise crop sensitivity and threshold logic.</p>
                    </div>
                  </div>
                  
                  {/* Farmer Inputs */}
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ marginTop: '4px', fontSize: '18px' }}>👨‍🌾</div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#202124', margin: '0 0 4px 0' }}>Farmer Inputs (Source: Manual entries)</p>
                      <p style={{ fontSize: '12px', color: '#5f6368', margin: '0' }}>Sowing date, crop observations, and field-level feedback.</p>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e0e0e0' }}>
                  <p style={{ fontSize: '11px', color: '#9aa0a6', fontStyle: 'italic', margin: '0' }}>
                    All insights are generated using open datasets and farmer-provided inputs. No private data is shared.
                  </p>
                </div>
              </div>
            </section>
            <section>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '6px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                  <div style={{ padding: '8px', backgroundColor: 'rgba(37, 211, 102, 0.1)', borderRadius: '50%' }}>
                    <span style={{ fontSize: '20px' }}>💬</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#202124', margin: '0' }}>Receive automated WhatsApp alerts</p>
                    <p style={{ fontSize: '12px', color: '#5f6368', margin: '4px 0 0 0' }}>Notifications for high-severity stress events only</p>
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input 
                    type="checkbox"
                    checked={whatsappEnabled}
                    onChange={(e) => setWhatsappEnabled(e.target.checked)}
                    style={{ display: 'none' }}
                  />
                  <div style={{
                    width: '44px',
                    height: '24px',
                    backgroundColor: whatsappEnabled ? '#1164e8' : '#e0e0e0',
                    borderRadius: '12px',
                    transition: 'background-color 0.3s',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      left: whatsappEnabled ? '22px' : '2px',
                      width: '20px',
                      height: '20px',
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                      transition: 'left 0.3s',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}></div>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: 4 COLS */}
          <div style={{ gridColumn: 'span 4' }}>
            <h3 style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.5px', margin: '0 0 12px 0', textTransform: 'uppercase' }}>
              Stress History
            </h3>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '6px', padding: '20px', marginBottom: '16px' }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="timeline-line"></div>

                {stressHistory.map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', gap: '12px' }}>
                    <div style={{
                      position: 'absolute',
                      zIndex: 10,
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: getSeverityColor(item.severity),
                      border: '2px solid #ffffff',
                      top: '4px',
                      left: '0',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}></div>
                    <div style={{ paddingLeft: '16px' }}>
                      <p style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', textTransform: 'uppercase', margin: '0 0 2px 0', letterSpacing: '0.3px' }}>{item.date}</p>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#202124', margin: '0 0 2px 0' }}>{item.title}</p>
                      <p style={{ fontSize: '12px', color: '#5f6368', margin: '0' }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Card */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderRadius: '6px', padding: '16px' }}>
              <p style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.5px', margin: '0 0 12px 0', textTransform: 'uppercase' }}>Next 48H Forecast</p>
              {weatherLoading ? (
                <p style={{ fontSize: '13px', color: '#5f6368', margin: '0' }}>Loading weather...</p>
              ) : weatherData ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div>
                      <p style={{ fontSize: '28px', fontWeight: '900', color: '#202124', margin: '0' }}>
                        {weatherData.current.temp}°C
                      </p>
                      <p style={{ fontSize: '12px', color: '#5f6368', margin: '4px 0 0 0' }}>
                        {weatherData.current.description}
                      </p>
                    </div>
                    <span style={{ fontSize: '40px' }}>
                      {getWeatherEmoji(weatherData.current.condition)}
                    </span>
                  </div>
                  <div style={{ paddingTop: '8px', borderTop: '1px solid #e0e0e0' }}>
                    <p style={{ fontSize: '10px', color: '#5f6368', fontWeight: '600', margin: '8px 0 4px 0', textTransform: 'uppercase' }}>Additional Info</p>
                    <div style={{ fontSize: '11px', color: '#5f6368', lineHeight: '1.6' }}>
                      <p style={{ margin: '2px 0' }}>💧 Humidity: {weatherData.current.humidity}%</p>
                      <p style={{ margin: '2px 0' }}>💨 Wind: {weatherData.current.windSpeed} km/h</p>
                      <p style={{ margin: '2px 0' }}>🌡️ High: {weatherData.nextHighTemp}°C</p>
                      <p style={{ margin: '2px 0', fontSize: '9px', color: '#9aa0a6', marginTop: '4px' }}>
                        {weatherData.source}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: '13px', color: '#d93025', margin: '0' }}>Unable to load weather data</p>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', borderTop: '1px solid #e0e0e0' }}>
          <p style={{ fontSize: '11px', fontWeight: '600', color: '#5f6368', letterSpacing: '0.5px', margin: '0', textTransform: 'uppercase' }}>
            POWERED BY PRECISIONAG FUSION ENGINE V4.2
          </p>
          <button style={{ padding: '6px 16px', backgroundColor: '#e0e0e0', border: 'none', fontSize: '12px', fontWeight: '600', color: '#202124', cursor: 'pointer', borderRadius: '4px', textTransform: 'uppercase' }}>
            Help &amp; Documentation
          </button>
        </footer>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
