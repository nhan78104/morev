import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import getAllMovies from './api/getAllMovies'
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

function App() {
  const [movies, setMovies] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetch = async () => {
    const res = await getAllMovies()
    setMovies(res)
  }

  useEffect(() => {
    fetch()
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home movies={movies} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/user' element={<UserPage />} />
            <Route path='/trailer/:ytTrailerId' element={<Trailer />} />
            <Route path='/film-detail/:id' element={<FilmDetail movies={movies} />} />
            <Route path='/reviews/:id' element={<Reviews />} />
            <Route path='/404-not-found' element={<NotFound />} />
            <Route path='*' element={<Navigate to='/404-not-found' />} />
            <Route path='/admin' element={<AdminPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
