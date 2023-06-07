import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getMovieData from '../../api/getMovieById'
import './style.css'

const FilmDetail = (movies) => {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const params = useParams()

  const movieId = params.movieId
  console.log(movieId)
  const recommendMovie = movies.movies.filter((mov) => {
    return mov.genres.find((genre) => genre === 'Science Fiction')
  })

  const fetch = useCallback(async () => {
    try {
      const res = await getMovieData(movieId)
      console.log(res)
      setMovie(res)

      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }, [movieId])

  useEffect(() => {
    fetch()
  }, [fetch])

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <div className='hero-container'>
        <div
          className='poster'
          style={{ backgroundImage: `url(${movie.backdrops[Math.floor(Math.random() * movie.backdrops.length)]})` }}
        >
          <div className='descrpition'>
            <h1>{movie.title}</h1>
            <h2>
              {'Genres: ' +
                movie?.genres
                  ?.reduce((genre, currGenre) => {
                    genre = genre + ', ' + currGenre
                    return genre
                  }, '')
                  .substring(2)}
            </h2>
          </div>
        </div>
      </div>
      <div className='recommend-container'></div>
    </>
  )
}

export default FilmDetail
