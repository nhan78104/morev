import './App.css'
import api from './api/axiosConfig'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Home from './components/home/Home'
import NotFound from './components/notFound/NotFound'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Trailer from './components/trailer/Trailer'
import Reviews from './components/reviews/Reviews'
import { Login } from './components/login/Login'
import { SignUp } from './components/signUp/SignUp'
import UserPage from './components/userPage/UserPage'
import FilmDetail from './components/filmDetail/FilmDetail'
import AuthProvider from './context/AuthProvider'
import getAllMovies from './api/getAllMovies'

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
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
