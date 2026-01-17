'use client'

import { useState, useEffect } from 'react'
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function TestAuthPage() {
  const [status, setStatus] = useState({
    firebaseInitialized: false,
    authObject: false,
    testEmail: 'farmer@test.com',
    testPassword: 'TestPass123!',
  })
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if Firebase is initialized
    if (auth) {
      setStatus(prev => ({
        ...prev,
        firebaseInitialized: true,
        authObject: true
      }))
    }
  }, [])

  const testLogin = async () => {
    setLoading(true)
    setResult('')
    
    try {
      console.log('Attempting login with:', status.testEmail)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        status.testEmail,
        status.testPassword
      )
      setResult(`✅ Success! Logged in as: ${userCredential.user.email}`)
    } catch (error) {
      console.error('Login error:', error)
      setResult(`❌ Error: ${error.code} - ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🔍 Firebase Auth Test</h1>

      <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>Status</h2>
        <p>✅ Firebase Initialized: {status.firebaseInitialized ? 'YES' : 'NO'}</p>
        <p>✅ Auth Object: {status.authObject ? 'YES' : 'NO'}</p>
      </div>

      <div style={{ background: '#e8f4f8', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h2>Test Login</h2>
        <p><strong>Email:</strong> {status.testEmail}</p>
        <p><strong>Password:</strong> {status.testPassword}</p>
        
        <button
          onClick={testLogin}
          disabled={loading}
          style={{
            padding: '10px 20px',
            background: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            marginTop: '10px'
          }}
        >
          {loading ? 'Testing...' : 'Test Login Now'}
        </button>
      </div>

      {result && (
        <div style={{
          background: result.includes('Success') ? '#d4edda' : '#f8d7da',
          padding: '15px',
          borderRadius: '4px',
          marginTop: '20px',
          border: '1px solid #ccc'
        }}>
          <p style={{ margin: 0, fontSize: '16px' }}>{result}</p>
          {result.includes('Error') && (
            <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
              <p><strong>Common causes:</strong></p>
              <ul>
                <li>Email/Password provider not enabled in Firebase Console</li>
                <li>Test user not created in Firebase Console</li>
                <li>User credentials don't match</li>
              </ul>
              <p><strong>To fix:</strong></p>
              <ol>
                <li>Go to Firebase Console → cropedge-a7d83</li>
                <li>Authentication → Sign-in method</li>
                <li>Ensure Email/Password shows as "Enabled" (green toggle)</li>
                <li>Create test user: farmer@test.com / TestPass123!</li>
              </ol>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <p>Open browser console (F12) to see detailed error messages</p>
      </div>
    </div>
  )
}
