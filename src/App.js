import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import Layout from './components/Layout'
import AuthProvider from './context/AuthProvider'
import MoviesProvider from './context/MoviesProvider'
import { AdminPage, FilmDetail, Home, Login, NotFound, SignUp, Trailer, UserPage, VerifyPage } from './pages'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  return (
    <BrowserRouter>
      <MoviesProvider>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route element={<PrivateRoutes />}>
                <Route path='/admin' element={<AdminPage />} />
                <Route path='/user' element={<UserPage />} />
              </Route>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/trailer/:ytTrailerId' element={<Trailer />} />
              <Route path='/film-detail/:id' element={<FilmDetail />} />
              <Route path='/send-verify-code/verify' element={<VerifyPage />} />
              <Route path='/404-not-found' element={<NotFound />} />
              <Route path='*' element={<Navigate to='/404-not-found' />} />
            </Route>
          </Routes>
        </AuthProvider>
      </MoviesProvider>
    </BrowserRouter>
  )
}

export default App
