import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AuthContext } from '../context/AuthProvider'

const PrivateRoutes = () => {
  const { state } = useContext(AuthContext)
  return state.user ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoutes
