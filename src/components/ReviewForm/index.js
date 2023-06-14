import React from 'react'
import { Button, Form } from 'react-bootstrap'

const ReviewForm = ({ handleKeyUp, handleSubmit, revText, labelText, defaultValue }) => {
  return (
    <Form onKeyUp={handleKeyUp}>
      <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
        <Form.Label>{labelText}</Form.Label>
        <Form.Control ref={revText} as='textarea' rows={3} defaultValue={defaultValue} />
      </Form.Group>
      <Button className='submit-button' variant='outline-info' onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}

export default ReviewForm
