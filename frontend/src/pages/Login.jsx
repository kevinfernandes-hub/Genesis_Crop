/**
 * Login Page
 * Farmer-friendly phone number + OTP based login
 * Mobile-first, minimal fields, high contrast
 */

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import FormInput from '../components/Common/FormInput'
import FormButton from '../components/Common/FormButton'
import '../styles/auth.css'

function Login() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }))
    }
  }

  const handleOtpChange = (e) => {
    setOtp(e.target.value)
    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: '' }))
    }
  }

  const validatePhone = () => {
    const cleanPhone = phone.replace(/\D/g, '')
    if (!phone.trim()) {
      setErrors({ phone: 'Phone number is required' })
      return false
    }
    if (cleanPhone.length < 10) {
      setErrors({ phone: 'Please enter a valid phone number (10 digits)' })
      return false
    }
    return true
  }

  const validateOtp = () => {
    if (!otp.trim()) {
      setErrors({ otp: 'OTP is required' })
      return false
    }
    if (otp.length !== 6) {
      setErrors({ otp: 'OTP must be 6 digits' })
      return false
    }
    return true
  }

  const handleSendOTP = async (e) => {
    e.preventDefault()

    if (!validatePhone()) {
      return
    }

    setLoading(true)
    setMessage('')
    setErrors({})

    try {
      // TODO: Add Firebase signInWithPhoneNumber() logic
      console.log('Sending OTP to:', phone)
      setMessage('OTP sent to your phone!')
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

    if (!validateOtp()) {
      return
    }

    setLoading(true)
    setMessage('')
    setErrors({})

    try {
      // TODO: Add Firebase confirmationResult.confirm() logic
      console.log('Verifying OTP:', otp)
      setMessage('Login successful!')
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } catch (err) {
      setErrors({ submit: err.message || 'Invalid OTP. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">📱 Farm Advisor</h1>
        <p className="auth-subtitle">Login to monitor your crops</p>

        {/* Step 1: Phone Number */}
        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <div className="form-group">
              <FormInput
                label="Mobile Number"
                name="phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+91 00000 00000"
                error={errors.phone}
                required
                icon="📞"
              />
            </div>

            {errors.submit && (
              <div className="message-box error-message">{errors.submit}</div>
            )}

            {message && (
              <div className="message-box success-message">{message}</div>
            )}

            <FormButton
              label={loading ? 'Sending OTP...' : 'Send OTP'}
              loading={loading}
              disabled={loading}
              fullWidth
              icon="✓"
            />

            <p className="auth-link">
              Don't have an account?{' '}
              <Link to="/signup" className="link-text">
                Sign up here
              </Link>
            </p>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <p className="step-info">
              Enter the 6-digit code sent to <strong>{phone}</strong>
            </p>

            <div className="form-group">
              <FormInput
                label="Enter OTP"
                name="otp"
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="000000"
                error={errors.otp}
                required
                icon="🔐"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setStep(1)
                setOtp('')
                setMessage('')
              }}
              className="link-button"
              disabled={loading}
            >
              ← Change phone number
            </button>

            {errors.submit && (
              <div className="message-box error-message">{errors.submit}</div>
            )}

            {message && (
              <div className="message-box success-message">{message}</div>
            )}

            <FormButton
              label={loading ? 'Verifying...' : 'Verify & Login'}
              loading={loading}
              disabled={loading}
              fullWidth
              icon="✓"
            />
          </form>
        )}

        {/* Info Box */}
        <div className="info-box">
          <p>
            <strong>💡 Tip:</strong> We use your phone number to keep your
            account secure. No passwords needed!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
