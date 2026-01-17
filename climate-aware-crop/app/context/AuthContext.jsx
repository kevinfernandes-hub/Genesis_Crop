'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

/**
 * AuthContext
 * Provides current user information to the entire app
 */
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (currentUser) {
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
          })
        } else {
          setUser(null)
        }
        setLoading(false)
      },
      (error) => {
        console.error('Auth error:', error)
        setError(error.message)
        setLoading(false)
      }
    )

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * useAuth Hook
 * Use this to access user information anywhere in the app
 * @returns {Object} { user, loading, error }
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
