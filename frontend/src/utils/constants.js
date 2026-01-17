/**
 * App Constants
 * Farmer-friendly terminology and values
 */

export const STRESS_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
}

export const STRESS_LABELS = {
  low: 'Healthy - No action needed',
  medium: 'Caution - Monitor closely',
  high: 'Warning - Action recommended',
  critical: 'Alert - Immediate action required'
}

export const STRESS_COLORS = {
  low: '#27ae60',      // Green
  medium: '#f39c12',   // Orange
  high: '#e74c3c',     // Red
  critical: '#8b0000'  // Dark red
}

// Farmer-friendly messages
export const MESSAGES = {
  loading: 'Loading data...',
  error: 'Something went wrong. Please try again.',
  noData: 'No data available yet',
  offline: 'You are offline. Some features may not work.',
  success: 'Done!'
}

// Data refresh intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  crops: 5 * 60 * 1000,        // 5 minutes
  stressData: 10 * 60 * 1000,  // 10 minutes
  notifications: 1 * 60 * 1000 // 1 minute
}

// Storage keys
export const STORAGE_KEYS = {
  authToken: 'authToken',
  user: 'user',
  lastRefresh: 'lastRefresh'
}
