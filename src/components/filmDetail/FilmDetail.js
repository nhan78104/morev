import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import getMovieById from '../../api/getMovieById'
import { MoviesContext } from '../../context/MoviesProvider'
import Reviews from '../reviews/Reviews'
import './style.css'

const FilmDetail = () => {
  const { movies } = useContext(MoviesContext)
  const [movie, setMovie] = useState(null)
  // const [recommendMovies, setRecommendMovies] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()
  const movieId = params.id

  const fetch = async () => {
    try {
      setIsLoading(true)
      const singleMovie = await getMovieById(movieId)

      setMovie(singleMovie.data)

      setIsLoading(false)
    } catch (error) {
      console.error('firm detail error', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <div className='hero-container'>
        <div
          className='poster'
          style={{ backgroundImage: `url(${movie?.backdrops[Math.floor(Math.random() * movie?.backdrops.length)]})` }}
        >
          <div className='descrpition'>
            <h1>{movie?.title}</h1>
            <h2>
              {'Genres: ' +
                movie?.genres
                  ?.reduce((genre, currGenre) => {
                    genre = genre + ', ' + currGenre
                    return genre
                  }, '')
                  .substring(2)}
            </h2>
            <h2>{movie?.releaseDate}</h2>
            <h2>
              Id excepteur proident nisi cillum. Nulla non cupidatat voluptate irure non culpa reprehenderit nisi dolor
              tempor ut elit. Ad nostrud Lorem laborum velit elit mollit reprehenderit aliqua est sunt dolor excepteur.
            </h2>
          </div>
        </div>
      </div>
      <Reviews movie={movie} />
      <div className='recommend-container'>
        <h1>Nội dung tương tự</h1>
        <div className='recommend-movie'>
          {movies &&
            movies?.map((movie) => {
              return (
                <div className='recommend-movie-item' key={movie.title}>
                  <img src={movie.poster} alt={movie.title} />
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default FilmDetail
