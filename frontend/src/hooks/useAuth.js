// Custom Auth Hook
// Provides authentication context and user state

import { useContext, useEffect, useState } from 'react'
import { onAuthChange } from '../services/authService'

// Create context (you can expand this into a separate context file)
import { createContext } from 'react'

export const AuthContext = createContext()

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return { user, loading }
}
