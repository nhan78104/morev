import { Spin } from 'antd'
import React, { createContext, useEffect, useState } from 'react'

import getUserInfo from '../api/getUserInfo'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const fetch = async () => {
    try {
      setIsLoading(true)
      if (localStorage.getItem('accessToken')) {
        const userAuthentication = await getUserInfo(localStorage.getItem('accessToken'))
        setUser(userAuthentication)
        setIsLoggedIn(true)
      }
      setIsLoading(false)
    } catch (error) {
      console.log('authentication error')
      setUser(null)
      setIsLoggedIn(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
    </AuthContext.Provider>
  )
}
