import React, { useEffect, useRef, useState, useCallback } from 'react'
import api from '../../api/axiosConfig'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import ReviewForm from '../reviewForm/ReviewForm'
import getMovieById from '../../api/getMovieById'

const Reviews = ({ reviews, setReviews }) => {
  const revText = useRef()
  const [movie, setMovie] = useState({ setReviews })
  const [isLoading, setIsLoading] = useState(true)
  let params = useParams()
  const movieId = params.id

  const addReview = async (e) => {
    e.preventDefault()

    const rev = revText.current

    try {
      const response = await api.post('/api/v1/reviews', { reviewBody: rev.value, imdbId: movieId })

      const updatedReview = [...reviews, { body: rev.value }]

      rev.value = ''

      setReviews(updatedReview)
    } catch (error) {
      console.log(error)
    }
  }

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
    return <h3>Loading...</h3>
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col>
          <img src={movie?.poster} alt='' />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm handleSubmit={addReview} revText={revText} LabelText='Write a review' />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews &&
            reviews.map((review) => {
              return (
                <>
                  <Row>
                    <Col>{review.body}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr />
                    </Col>
                  </Row>
                </>
              )
            })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  )
}

export default Reviews
