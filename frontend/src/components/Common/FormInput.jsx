/**
 * FormInput Component
 * Reusable input field with large, accessible design
 * Farmer-friendly with large text and high contrast
 */

import React from 'react'

function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  icon = null
}) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {icon && <span className="input-icon">{icon}</span>}
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-input ${error ? 'input-error' : ''}`}
        autoComplete="off"
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  )
}

export default FormInput
