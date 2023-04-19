import './App.css'
import api from './api/axiosConfig'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Home from './components/home/Home'
import { Routes, Route } from 'react-router-dom'

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
  console.log(movies)

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
