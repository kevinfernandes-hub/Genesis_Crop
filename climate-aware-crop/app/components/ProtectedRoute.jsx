'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

/**
 * ProtectedRoute Component
 * Wraps pages that require authentication
 * Redirects to login if user is not authenticated
 */
export function ProtectedRoute({ children }) {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Show loading state while checking auth
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '16px',
        color: '#666',
      }}>
        Loading...
      </div>
    )
  }

  // Only render children if user is authenticated
  if (user) {
    return children
  }

  // Don't render anything while redirecting
  return null
}
