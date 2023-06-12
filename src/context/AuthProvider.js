import { Spin } from 'antd'
import React, { createContext, useCallback, useEffect, useReducer, useState } from 'react'

import getUserInfo from '../api/getUserInfo'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const initialState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER':
        if (action.data) {
          state.isAuthenticated = true
        }
        return {
          ...state,
          user: action.data,
        }
      case 'SET_ACCESS_TOKEN':
        return {
          ...state,
          accessToken: action.data,
        }
      case 'CLEAR_USER_INFO':
        return {
          isAuthenticated: false,
          user: null,
          accessToken: null,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchUser = useCallback(async () => {
    const response = await getUserInfo(state.accessToken)
    dispatch({ type: 'SET_USER', data: response })
  }, [state.accessToken])

  useEffect(() => {
    setIsLoading(true)
    dispatch({
      type: 'SET_ACCESS_TOKEN',
      data: localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'),
    })
    setIsLoading(false)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    if (state.accessToken) {
      fetchUser()
    }
    setIsLoading(false)
  }, [state.accessToken, fetchUser])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
    </AuthContext.Provider>
  )
}
