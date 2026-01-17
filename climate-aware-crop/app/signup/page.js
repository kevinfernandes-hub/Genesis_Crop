'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './signup.module.css'

export default function SignupPage() {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    village: '',
    cropType: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Handle form input changes
   * Phone field: only digits, max 10
   */
  const handleChange = (e) => {
    const { name, value } = e.target

    // Special handling for phone - only digits
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '')
      if (digitsOnly.length <= 10) {
        setFormData(prev => ({
          ...prev,
          [name]: digitsOnly,
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }

    setError('')
  }

  /**
   * Handle form submission
   * No real signup logic yet
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!formData.fullName.trim()) {
      setError('Please enter your full name')
      return
    }
    if (formData.phone.length < 10) {
      setError('Please enter a valid 10-digit phone number')
      return
    }
    if (!formData.village.trim()) {
      setError('Please enter your village or location')
      return
    }
    if (!formData.cropType) {
      setError('Please select a crop type')
      return
    }

    // Simulate signup
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 600))
    setIsLoading(false)

    // Clear form (no actual signup yet)
    setFormData({
      fullName: '',
      phone: '',
      village: '',
      cropType: '',
    })
  }

  return (
    <div className={styles.container}>
      {/* Left Column - Branding & Description */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <h1 className={styles.title}>Join Our Community</h1>
          <p className={styles.description}>
            Create an account to start monitoring crop stress and make better farming decisions with real-time climate data.
          </p>
          <ul className={styles.featureList}>
            <li>Free monitoring for all farmers</li>
            <li>Real-time stress alerts</li>
            <li>Expert recommendations</li>
          </ul>
        </div>
      </aside>

      {/* Right Column - Signup Form */}
      <main className={styles.main}>
        <div className={styles.card}>
          <h2 className={styles.heading}>Create your account</h2>
          <p className={styles.subheading}>
            Get started in less than 2 minutes
          </p>

          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Full Name Field */}
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.label}>
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                disabled={isLoading}
                className={styles.input}
                aria-label="Full name"
              />
            </div>

            {/* Phone Number Field */}
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone Number
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.phonePrefix}>+91</span>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="98765 43210"
                  maxLength="10"
                  disabled={isLoading}
                  className={styles.input}
                  aria-label="Phone number"
                />
              </div>
              <p className={styles.hint}>
                We'll use this to send you updates
              </p>
            </div>

            {/* Village / Location Field */}
            <div className={styles.formGroup}>
              <label htmlFor="village" className={styles.label}>
                Village / Location
              </label>
              <input
                id="village"
                type="text"
                name="village"
                value={formData.village}
                onChange={handleChange}
                placeholder="Enter your village or town"
                disabled={isLoading}
                className={styles.input}
                aria-label="Village or location"
              />
            </div>

            {/* Crop Type Field */}
            <div className={styles.formGroup}>
              <label htmlFor="cropType" className={styles.label}>
                Primary Crop
              </label>
              <select
                id="cropType"
                name="cropType"
                value={formData.cropType}
                onChange={handleChange}
                disabled={isLoading}
                className={styles.input}
                aria-label="Primary crop type"
              >
                <option value="">Select a crop type</option>
                <option value="rice">Rice</option>
                <option value="wheat">Wheat</option>
                <option value="corn">Corn</option>
                <option value="cotton">Cotton</option>
                <option value="sugarcane">Sugarcane</option>
                <option value="potato">Potato</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={styles.button}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer Text */}
          <p className={styles.footer}>
            Already registered?{' '}
            <Link href="/login" className={styles.link}>
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
