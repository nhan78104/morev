import './Hero.css'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import getMovies from '../../db/db'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Hero = ({ movies }) => {
  const navigate = useNavigate()
  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`)
  }
  const moviesFake = getMovies()

  return (
    <div className='movie-carousel-container'>
      {moviesFake?.length && (
        <Carousel>
          {moviesFake.map((movie, index) => {
            return (
              <Paper key={index + 1}>
                <div className='movie-card-container'>
                  <div className='movie-card' style={{ '--img': `url("${movie.backdrops[0]}")` }}>
                    <div className='movie-detail'>
                      <div className='movie-poster'>
                        <img src={movie.poster} alt='' />
                      </div>
                      <div className='movie-title'>
                        <h4>{movie.title}</h4> {/* Xài api của Tri không viết dấu */}
                      </div>
                      <div className='movie-buttons-container'>
                        <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                          <div className='play-button-icon-container'>
                            <FontAwesomeIcon className='play-button-icon' icon={faCirclePlay} />
                          </div>
                        </Link>
                        <div className='movie-review-button-container'>
                          <Button variant='info' onClick={() => reviews(movie.imdbId)}></Button>
                        </div>
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
