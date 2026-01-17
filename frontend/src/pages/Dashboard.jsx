/**
 * Dashboard Page
 * Crop Stress Monitoring Dashboard for Farmers
 * 
 * Features:
 * - Color-coded stress status cards
 * - Today's advisory with actionable advice
 * - Crop details (name, stage, days)
 * - Stress event timeline
 * - Mobile-first responsive design
 * - Professional, clean UI suitable for hackathon
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import StressStatusCard from '../components/Dashboard/StressStatusCard'
import StressTimeline from '../components/Dashboard/StressTimeline'
import '../styles/dashboard.css'

// ==================== MOCK DATA ====================
// TODO: Replace with real data from Firebase/API

const MOCK_CROP_DATA = {
  name: 'Cotton',
  stage: 'Flowering',
  daysAfterSowing: 65
}

// Current stress status cards
const MOCK_STRESS_STATUS = [
  {
    type: 'Heat Stress',
    severity: 'high'
  },
  {
    type: 'Soil Moisture',
    severity: 'moderate'
  },
  {
    type: 'Rainfall',
    severity: 'low'
  }
]

// Past stress events for timeline
const MOCK_TIMELINE = [
  {
    id: '1',
    date: '16 Jan 2026',
    type: 'Heat Stress',
    severity: 'high'
  },
  {
    id: '2',
    date: '15 Jan 2026',
    type: 'Excess Rainfall',
    severity: 'moderate'
  },
  {
    id: '3',
    date: '14 Jan 2026',
    type: 'Moderate Heat',
    severity: 'moderate'
  },
  {
    id: '4',
    date: '12 Jan 2026',
    type: 'Drought Stress',
    severity: 'high'
  },
  {
    id: '5',
    date: '10 Jan 2026',
    type: 'No Stress',
    severity: 'low'
  }
]

// ==================== MAIN COMPONENT ====================

function Dashboard() {
  const navigate = useNavigate()

  // Handle logout - navigate back to login
  const handleLogout = () => {
    // TODO: Call Firebase logout here
    navigate('/login')
  }

  return (
    <div className="dashboard-page">
      {/* ==================== HEADER ==================== */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Crop Stress Dashboard</h1>
        <p className="dashboard-subtitle">
          {MOCK_CROP_DATA.name} • Monitoring System
        </p>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="dashboard-main">
        {/* CURRENT STATUS SECTION */}
        <section className="dashboard-section">
          <h2 className="section-title">Current Status</h2>
          <div className="status-cards">
            {MOCK_STRESS_STATUS.map((status, index) => (
              <StressStatusCard
                key={index}
                stressType={status.type}
                severity={status.severity}
              />
            ))}
          </div>
        </section>

        {/* TODAY'S ADVISORY SECTION */}
        <section className="dashboard-section">
          <div className="advisory-box">
            <h2 className="advisory-title">Today's Advisory</h2>
            <p className="advisory-text">
              Water the crop in the evening. Avoid watering during peak
              afternoon heat. Monitor soil moisture carefully—it is critical
              during the flowering stage.
            </p>
          </div>
        </section>

        {/* CROP DETAILS SECTION */}
        <section className="dashboard-section">
          <h2 className="section-title">Crop Details</h2>
          <div className="crop-details">
            <div className="detail-item">
              <span className="detail-label">Crop Type</span>
              <span className="detail-value">{MOCK_CROP_DATA.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Growth Stage</span>
              <span className="detail-value">{MOCK_CROP_DATA.stage}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Days After Sowing</span>
              <span className="detail-value">{MOCK_CROP_DATA.daysAfterSowing}</span>
            </div>
          </div>
        </section>

        {/* STRESS TIMELINE SECTION */}
        <section className="dashboard-section">
          <h2 className="section-title">Stress Timeline</h2>
          <StressTimeline events={MOCK_TIMELINE} />
        </section>

        {/* LOGOUT BUTTON */}
        <button
          className="btn-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard
