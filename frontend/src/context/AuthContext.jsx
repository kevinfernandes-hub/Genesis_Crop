/**
 * Authentication Context
 * Manages user authentication state across the app
 * Temporary: Firebase logic disabled for debugging
 */

import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Logout function
  const logout = async () => {
    try {
      setUser(null)
      localStorage.removeItem('authToken')
    } catch (err) {
      setError(err.message)
    }
  }

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
