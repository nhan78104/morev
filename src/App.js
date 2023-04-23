import './App.css'
import api from './api/axiosConfig'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Home from './components/home/Home'
import Header from './components/header/Header'
import NotFound from './components/notFound/NotFound'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const [movies, setMovies] = useState()

  const getMovies = async () => {
    try {
      const response = await api.get('horizon-code-academy/fake-movies-api/movies') // path from java api

      setMovies(response.data)
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
          <Route path='/404-not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/404-not-found' />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
