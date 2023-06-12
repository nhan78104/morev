import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import Layout from './components/Layout'
import AdminPage from './components/admin'
import FilmDetail from './components/filmDetail/FilmDetail'
import Home from './components/home/Home'
import { Login } from './components/login/Login'
import NotFound from './components/notFound/NotFound'
import Reviews from './components/reviews/Reviews'
import { SignUp } from './components/signUp/SignUp'
import Trailer from './components/trailer/Trailer'
import UserPage from './components/userPage/UserPage'
import AuthProvider from './context/AuthProvider'
import MoviesProvider from './context/MoviesProvider'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  return (
    <BrowserRouter>
      <MoviesProvider>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/trailer/:ytTrailerId' element={<Trailer />} />
              <Route path='/film-detail/:id' element={<FilmDetail />} />
              <Route path='/reviews/:id' element={<Reviews />} />
              <Route path='/404-not-found' element={<NotFound />} />
              <Route path='*' element={<Navigate to='/404-not-found' />} />
              <Route element={<PrivateRoutes />}>
                <Route path='/admin' element={<AdminPage />} />
                <Route path='/user' element={<UserPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </MoviesProvider>
    </BrowserRouter>
  )
}

export default App
