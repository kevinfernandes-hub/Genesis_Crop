// Placeholder: ProtectedRoute component
// Wraps routes that require authentication

import { useAuth } from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" />

  return children
}
