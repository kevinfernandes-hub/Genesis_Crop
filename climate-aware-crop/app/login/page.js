'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import Link from 'next/link'
import styles from './login.module.css'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Basic validation
    if (!email.trim()) {
      setError('Please enter your email')
      setLoading(false)
      return
    }

    if (!password) {
      setError('Please enter your password')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, email.toLowerCase().trim(), password)
      
      // Redirect to dashboard on success
      router.push('/dashboard')
    } catch (err) {
      // Handle Firebase errors
      if (err.code === 'auth/invalid-email') {
        setError('Invalid email address')
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email')
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password')
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many login attempts. Try again later')
      } else if (err.code === 'auth/user-disabled') {
        setError('This account has been disabled')
      } else {
        setError(err.message || 'Failed to sign in')
      }
      console.error('Sign in error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      {/* Left Column - Branding */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <h1 className={styles.title}>Crop Stress Monitor</h1>
          <p className={styles.description}>
            Real-time climate-aware monitoring system for your crops. Make data-driven farming decisions.
          </p>
          <ul className={styles.featureList}>
            <li>Monitor crop stress conditions</li>
            <li>Climate-aware insights</li>
            <li>Real-time alerts</li>
            <li>Personalized recommendations</li>
          </ul>
        </div>
      </aside>

      {/* Right Column - Login Form */}
      <main className={styles.main}>
        <div className={styles.card}>
          <h2 className={styles.heading}>Farmer Login</h2>
          <p className={styles.subheading}>
            Enter your credentials to access your dashboard
          </p>

          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
                className={styles.input}
                autoComplete="email"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
                className={styles.input}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.button}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className={styles.footer}>
            Don't have an account?{' '}
            <Link href="/signup" className={styles.link}>
              Create one
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
