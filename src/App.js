import './App.css'
import api from './api/axiosConfig'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Home from './components/home/Home'
import Header from './components/header/Header'
import NotFound from './components/notFound/NotFound'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Trailer from './components/trailer/Trailer'
import Reviews from './components/reviews/Reviews'
import getApi from './db/db' // fake api
import { Login } from './components/login/Login'
import { SignUp } from './components/signUp/SignUp'
import UserPage from './components/userPage/UserPage'
import AuthProvider from './context/AuthProvider'

function App() {
  const [movies, setMovies] = useState()
  const [movie, setMovie] = useState()
  const [reviews, setReviews] = useState()

  const getMovies = async () => {
    try {
      const response = await api.get('horizon-code-academy/fake-movies-api/movies') // path from java api

      setMovies(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getMovieData = async (movieId) => {
    try {
      // const response = await api.get(`api/v1/movies/${movieId}`)

      // const singleMovie = response.data
      const response = getApi().find((obj) => obj.imdbId === 'tt3915174')

      const singleMovie = response

      setMovie(singleMovie)

      setReviews(singleMovie.reviews)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

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
            <Route
              path='/reviews/:movieId'
              element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />}
            />
            <Route path='/404-not-found' element={<NotFound />} />
            <Route path='*' element={<Navigate to='/404-not-found' />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
