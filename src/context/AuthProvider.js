import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscibed = (user) => {
      //reset user info
    }

    return () => {
      unsubscibed()
    }
  }, [navigate])

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
