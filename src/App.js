import './App.css'
import api from './api/axiosConfig'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Home from './components/home/Home'
import Header from './components/header/Header'
import NotFound from './components/notFound/NotFound'
import { Routes, Route, Navigate } from 'react-router-dom'
import Trailer from './components/trailer/Trailer'
import Reviews from './components/reviews/Reviews'

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
      const response = await api.get(`api/v1/movies/${movieId}`)

      const singleMovie = response.data

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
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />} />
          <Route path='/Trailer/:ytTrailerId' element={<Trailer />} />
          <Route
            path='/Reviews/:movieId'
            element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />}
          />
          <Route path='/404-not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/404-not-found' />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
