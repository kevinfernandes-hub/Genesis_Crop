'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './login.module.css'

export default function LoginPage() {
  // State for phone + OTP flow
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('phone') // 'phone' or 'otp'
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Handle phone number input
   * Only accepts digits and formats as user types
   */
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 10) {
      setPhone(value)
      setError('')
    }
  }

  /**
   * Handle OTP input
   * Only accepts digits, max 6 characters
   */
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 6) {
      setOtp(value)
      setError('')
    }
  }

  /**
   * Submit phone number
   * No real API call yet - just moves to OTP step
   */
  const handlePhoneSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (phone.length < 10) {
      setError('Please enter a valid 10-digit phone number')
      return
    }

    // Simulate sending OTP
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    setIsLoading(false)
    setStep('otp')
  }

  /**
   * Submit OTP
   * No real verification yet
   */
  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (otp.length < 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }

    // Simulate OTP verification
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    setIsLoading(false)
    // No redirect - just clear for demo
    setPhone('')
    setOtp('')
    setStep('phone')
  }

  /**
   * Go back to phone entry
   */
  const handleBack = () => {
    setStep('phone')
    setOtp('')
    setError('')
  }

  return (
    <div className={styles.container}>
      {/* Left Column - Branding & Description */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <h1 className={styles.title}>Crop Stress Monitoring</h1>
          <p className={styles.description}>
            Monitor real-time crop stress conditions across your fields. Make informed decisions with climate-aware insights.
          </p>
          <ul className={styles.featureList}>
            <li>Real-time stress detection</li>
            <li>Climate-aware predictions</li>
            <li>Actionable recommendations</li>
          </ul>
        </div>
      </aside>

      {/* Right Column - Login Form */}
      <main className={styles.main}>
        <div className={styles.card}>
          {step === 'phone' ? (
            // Phone Entry Step
            <>
              <h2 className={styles.heading}>Sign in to your account</h2>
              <p className={styles.subheading}>
                Enter your phone number to get started
              </p>

              {error && (
                <div className={styles.error} role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handlePhoneSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone Number
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.phonePrefix}>+91</span>
                    <input
                      id="phone"
                      type="text"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="98765 43210"
                      maxLength="10"
                      disabled={isLoading}
                      className={styles.input}
                      aria-label="Phone number"
                    />
                  </div>
                  <p className={styles.hint}>
                    We'll send you an OTP to verify
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || phone.length < 10}
                  className={styles.button}
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            </>
          ) : (
            // OTP Entry Step
            <>
              <h2 className={styles.heading}>Verify your phone number</h2>
              <p className={styles.subheading}>
                We sent a code to +91 {phone.slice(0, 5)} {phone.slice(5)}
              </p>

              {error && (
                <div className={styles.error} role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleOtpSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="otp" className={styles.label}>
                    Enter OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="000000"
                    maxLength="6"
                    disabled={isLoading}
                    className={styles.input}
                    aria-label="One-time password"
                  />
                  <p className={styles.hint}>
                    6-digit code sent to your phone
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.length < 6}
                  className={styles.button}
                >
                  {isLoading ? 'Verifying...' : 'Verify'}
                </button>
              </form>

              <button
                type="button"
                onClick={handleBack}
                className={styles.backButton}
              >
                Use a different number
              </button>
            </>
          )}

          {/* Footer Text */}
          <p className={styles.footer}>
            New user?{' '}
            <Link href="/signup" className={styles.link}>
              Create account
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
