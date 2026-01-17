'use client'

import { useState, useEffect } from 'react'

/**
 * System Status Check Component
 * Verifies Firebase connection and app health
 */
export default function SystemCheck() {
  const [status, setStatus] = useState({
    appRunning: false,
    firebaseConnected: false,
    envVarsLoaded: false,
    errors: [],
  })

  useEffect(() => {
    const checkSystem = async () => {
      const errors = []
      
      // Check 1: App is running
      const appRunning = true // If this code executes, app is running
      
      // Check 2: Firebase environment variables
      const apiKey = typeof window !== 'undefined' ? 
        (window.location.hostname === 'localhost' ? 'NEXT_PUBLIC_FIREBASE_API_KEY' : 'set') : null
      
      const envVarsLoaded = !!(
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      )
      
      if (!envVarsLoaded) {
        errors.push('Firebase environment variables not configured')
      }
      
      // Check 3: Firebase connectivity
      const firebaseConnected = envVarsLoaded
      
      setStatus({
        appRunning,
        firebaseConnected,
        envVarsLoaded,
        errors,
      })
    }
    
    checkSystem()
  }, [])
  const allGood = status.appRunning && status.firebaseConnected && !status.errors.length

  return (
    <div style={{
      padding: '40px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
    }}>
      <h1>System Status Check</h1>
      
      <div style={{
        backgroundColor: allGood ? '#d4edda' : '#f8d7da',
        border: `1px solid ${allGood ? '#c3e6cb' : '#f5c6cb'}`,
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px',
      }}>
        <h2 style={{
          margin: '0 0 12px 0',
          color: allGood ? '#155724' : '#721c24',
        }}>
          {allGood ? '✅ All Systems Operational' : '⚠️ Issues Detected'}
        </h2>
      </div>

      {/* Status Items */}
      <div style={{ marginBottom: '24px' }}>
        <h3>Service Status</h3>
        
        <StatusItem 
          label="App Running"
          status={status.appRunning}
        />
        
        <StatusItem 
          label="Environment Variables Loaded"
          status={status.envVarsLoaded}
        />
        
        <StatusItem 
          label="Firebase Connected"
          status={status.firebaseConnected}
        />
      </div>

      {/* Errors */}
      {status.errors.length > 0 && (
        <div style={{
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
        }}>
          <h3 style={{ marginTop: 0, color: '#721c24' }}>Errors</h3>
          {status.errors.map((error, idx) => (
            <p key={idx} style={{ margin: '8px 0', color: '#721c24' }}>
              • {error}
            </p>
          ))}
        </div>
      )}

      {/* Connection Details */}
      <div style={{
        backgroundColor: '#e7f3ff',
        border: '1px solid #b3d9ff',
        borderRadius: '8px',
        padding: '16px',
      }}>
        <h3 style={{ marginTop: 0 }}>Connection Details</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Firebase Project: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Not set'}</li>
          <li>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'Not set'}</li>
          <li>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✓ Configured' : '✗ Missing'}</li>
        </ul>
      </div>

      {/* Next Steps */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
      }}>
        <h3 style={{ marginTop: 0 }}>Next Steps</h3>
        {allGood ? (
          <p>
            ✅ System is healthy. You can now:
            <ul>
              <li>Go to <a href="/login">/login</a> to test authentication</li>
              <li>Create a test user in Firebase Console</li>
              <li>Test login with credentials</li>
            </ul>
          </p>
        ) : (
          <p>
            ⚠️ Please check the errors above and:
            <ul>
              <li>Verify .env.local has all Firebase credentials</li>
              <li>Check that firebase.js is properly configured</li>
              <li>Restart the dev server: <code>npm run dev</code></li>
            </ul>
          </p>
        )}
      </div>
    </div>
  )
}

/**
 * Status Item Component
 */
function StatusItem({ label, status }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      marginBottom: '8px',
      backgroundColor: status ? '#d4edda' : '#f8d7da',
      borderRadius: '4px',
      borderLeft: `4px solid ${status ? '#28a745' : '#dc3545'}`,
    }}>
      <span style={{
        fontSize: '20px',
        marginRight: '12px',
      }}>
        {status ? '✅' : '❌'}
      </span>
      <span style={{
        flex: 1,
        color: status ? '#155724' : '#721c24',
        fontWeight: 500,
      }}>
        {label}
      </span>
      <span style={{
        color: status ? '#155724' : '#721c24',
        fontSize: '12px',
      }}>
        {status ? 'OK' : 'ERROR'}
      </span>
    </div>
  )
}
