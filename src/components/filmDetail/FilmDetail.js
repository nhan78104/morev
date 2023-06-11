import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getMovieById from '../../api/getMovieById'
import './style.css'

const FilmDetail = (movies) => {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const params = useParams()

  const movieId = params.id
  const recommendMovie = movies.movies.filter((mov) => {
    // max la 12 phim
    return mov.genres.find((genre) => genre === 'Science Fiction')
  })

  const fetch = useCallback(async () => {
    try {
      const res = await getMovieById(movieId)
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
          style={{ backgroundImage: `url(${movie?.backdrops[Math.floor(Math.random() * movie.backdrops.length)]})` }}
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
            <h2>{movie.releaseDate}</h2>
            <h2>
              Id excepteur proident nisi cillum. Nulla non cupidatat voluptate irure non culpa reprehenderit nisi dolor
              tempor ut elit. Ad nostrud Lorem laborum velit elit mollit reprehenderit aliqua est sunt dolor excepteur.
            </h2>
          </div>
        </div>
      </div>
      <div className='recommend-container'>
        <h1>Nội dung tương tự</h1>
        <div className='recommend-movie'>
          {recommendMovie.map((movie) => {
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
