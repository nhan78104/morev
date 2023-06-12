import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AuthContext } from '../context/AuthProvider'

const PrivateRoutes = () => {
  const { state } = useContext(AuthContext)
  return state.isAuthenticated ? <Outlet /> : <Navigate to='/404-not-found' />
}

export default PrivateRoutes
