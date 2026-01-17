/**
 * FormButton Component
 * Large, accessible button for farmers
 * High contrast, clear visual feedback
 */

import React from 'react'

function FormButton({
  label,
  onClick,
  loading = false,
  disabled = false,
  type = 'button',
  variant = 'primary',
  fullWidth = true,
  icon = null
}) {
  const buttonClass = `btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${
    loading ? 'btn-loading' : ''
  }`

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClass}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {loading ? 'Please wait...' : label}
    </button>
  )
}

export default FormButton
