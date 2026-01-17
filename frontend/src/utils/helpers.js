// Helper functions
// Utility functions for common operations

export const getStressLevel = (stressValue) => {
  if (stressValue < 25) return 'low'
  if (stressValue < 50) return 'medium'
  if (stressValue < 75) return 'high'
  return 'critical'
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const calculateTrend = (oldValue, newValue) => {
  return ((newValue - oldValue) / oldValue) * 100
}
