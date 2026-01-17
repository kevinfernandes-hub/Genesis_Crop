/**
 * Signup Page
 * Farmer-friendly registration form
 * Phone number + OTP based signup (future Firebase integration)
 * 
 * Design:
 * - Mobile-first, single column
 * - Large text and buttons for low digital literacy
 * - Minimal required fields
 * - High contrast colors
 * 
 * TODO:
 * - Firebase sign up logic
 * - OTP verification
 * - Error handling
 * - Success feedback
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormInput from '../components/Common/FormInput'
import FormButton from '../components/Common/FormButton'
import '../styles/auth.css'

function Signup() {
  const [step, setStep] = useState(1) // Step 1: Enter phone & name, Step 2: OTP verification
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    otp: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateStep1 = () => {
    const newErrors = {}

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required'
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendOTP = async (e) => {
    e.preventDefault()

    if (!validateStep1()) {
      return
    }

    setLoading(true)
    setMessage('')

    try {
      // TODO: Add Firebase send OTP logic
      console.log('Sending OTP to:', formData.phone)
      setMessage('OTP sent successfully! Check your phone.')
      setTimeout(() => {
        setStep(2)
      }, 1500)
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to send OTP' })
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()

    if (!validateStep2()) {
      return
    }

    setLoading(true)
    setMessage('')

    try {
      // TODO: Add Firebase OTP verification logic
      console.log('Verifying OTP:', formData.otp)
      setMessage('Sign up successful! Redirecting...')
      // TODO: Navigate to dashboard after successful signup
    } catch (err) {
      setErrors({ submit: err.message || 'OTP verification failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h1 className="app-title">🌾 Farm Advisor</h1>
          <p className="app-subtitle">Register to get started</p>
        </div>

        {/* Error/Success Messages */}
        {errors.submit && (
          <div className="message-box error-box">{errors.submit}</div>
        )}
        {message && <div className="message-box success-box">{message}</div>}

        {/* Step 1: Phone & Name */}
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <div className="form-section">
              <h2 className="form-title">Create Your Account</h2>

              <FormInput
                label="Your Name (Optional)"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Ramesh Kumar"
                error={errors.name}
                icon="👤"
              />

              <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="10-digit phone number"
                error={errors.phone}
                required={true}
                icon="📱"
              />

              <p className="help-text">
                We'll send you an OTP (One-Time Password) to verify your phone
                number
              </p>

              <FormButton
                label="Send OTP"
                loading={loading}
                type="submit"
                icon="✓"
              />
            </div>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <div className="form-section">
              <h2 className="form-title">Verify Your Phone</h2>

              <p className="verify-text">
                We sent a 6-digit code to <strong>{formData.phone}</strong>
              </p>

              <FormInput
                label="Enter OTP Code"
                name="otp"
                type="text"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="e.g., 123456"
                error={errors.otp}
                required={true}
                icon="🔐"
              />

              <FormButton
                label="Verify & Sign Up"
                loading={loading}
                type="submit"
                icon="✓"
              />

              <button
                type="button"
                className="btn-link"
                onClick={() => setStep(1)}
                disabled={loading}
              >
                ← Change phone number
              </button>
            </div>
          </form>
        )}

        {/* Navigation */}
        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Info Box for Farmers */}
      <div className="info-box">
        <p>
          <strong>💡 Tip:</strong> Keep your phone number handy for login. No
          password needed!
        </p>
      </div>
    </div>
  )
}

export default Signup
