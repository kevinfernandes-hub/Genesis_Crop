/**
 * Header Component
 * Mobile-friendly header with user menu
 * Shows app title and logout button
 * 
 * TODO:
 * - User profile dropdown
 * - Logout functionality
 * - Offline indicator
 */

import React from 'react'
import { useAuth } from '../../context/AuthContext'

function Header() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>🌾 Farm Advisor</h1>
          <p>Crop Stress Monitor</p>
        </div>

        <div className="header-actions">
          {user && <span className="user-email">{user.email}</span>}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
