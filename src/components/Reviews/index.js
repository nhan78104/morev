import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

import addReview from '../../api/addReview'
import getAllReviews from '../../api/getAllReviews'
import { ReviewForm } from '../../components'
import { AuthContext } from '../../context/AuthProvider'

const Reviews = ({ movie }) => {
  const { state } = useContext(AuthContext)
  const revText = useRef()
  const [reviews, setReviews] = useState(null)
  let params = useParams()
  const id = params.id

  const handleSubmit = async () => {
    const rev = revText.current

    try {
      await addReview(state.accessToken, id, rev.value.trim())
      fetchReviews()
      setReviews(reviews)
      rev.value = ''
    } catch (err) {
      console.error(err)
    }
  }

  const handleKeyUp = (event) => {
    // Enter
    if (event.keyCode === 13) {
      handleSubmit()
    }
  }

  const fetchReviews = useCallback(async () => {
    const allReviews = await getAllReviews(id)

    const reviewMessages = allReviews.map((review) => {
      return review.content.slice(1, -1)
    })
    setReviews(reviewMessages.reverse())
  }, [id])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  return (
    state.accessToken && (
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
                    <ReviewForm
                      handleKeyUp={handleKeyUp}
                      handleSubmit={handleSubmit}
                      revText={revText}
                      labelText='Write a review'
                    />
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
              reviews.map((review, index) => {
                return (
                  <div key={index}>
                    <Row>
                      <Col>{review}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <hr />
                      </Col>
                    </Row>
                  </div>
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
  )
}

export default Reviews
