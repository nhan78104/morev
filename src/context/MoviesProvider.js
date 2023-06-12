import { Spin } from 'antd'
import React, { createContext, useCallback, useEffect, useState } from 'react'

import getAllMovies from '../api/getAllMovies'

export const MoviesContext = createContext()

export default function MoviesProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState(null)

  const fetchMovies = useCallback(async () => {
    const response = await getAllMovies()
    setMovies(response)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    fetchMovies()
    setIsLoading(false)
  }, [fetchMovies])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <MoviesContext.Provider value={{ movies, setMovies }}>
      {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
    </MoviesContext.Provider>
  )
}
