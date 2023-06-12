import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import api from '../../api/axiosConfig'
import ReviewForm from '../reviewForm/ReviewForm'

const Reviews = ({ movie }) => {
  const revText = useRef()
  const [reviews, setReviews] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let params = useParams()
  const movieId = params.id

  const addReview = async (e) => {
    e.preventDefault()

    const rev = revText.current

    console.log(rev.value)

    // try {
    //   const response = await api.post('/api/v1/reviews', { reviewBody: rev.value, imdbId: movieId })

    //   const updatedReview = [{ body: rev.value }]

    //   rev.value = ''
    // } catch (error) {
    //   console.log(error)
    // }
  }

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
