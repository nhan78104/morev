import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Paper } from '@mui/material'
import { useContext } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom'

import { MoviesContext } from '../../context/MoviesProvider'
import './style.css'

const Hero = () => {
  const { movies } = useContext(MoviesContext)
  return (
    <div className='movie-carousel-container'>
      {movies?.length && (
        <Carousel>
          {movies?.map((movie, index) => {
            return (
              <Paper key={index + 1}>
                <div className='movie-card-container'>
                  <div className='movie-card' style={{ '--img': `url("${movie?.backdrop && movie?.backdrop[0]}")` }}>
                    <div className='movie-detail'>
                      <div className='movie-poster'>
                        <img src={movie.poster} alt='' />
                      </div>
                      <div className='movie-title'>
                        <Link
                          to={`/film-detail/${movie.id}`}
                          style={{ textDecoration: 'none', color: '#5bcae8', fontSize: '2rem' }}
                        >
                          {movie.title}
                        </Link>
                      </div>
                      <div className='movie-buttons-container'>
                        <Link to={`/trailer/${movie?.trailerLink?.substring(movie?.trailerLink.length - 11)}`}>
                          <div className='play-button-icon-container'>
                            <FontAwesomeIcon className='play-button-icon' icon={faCirclePlay} />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
            )
          })}
        </Carousel>
      )}
    </div>
  )
}

export default Hero
