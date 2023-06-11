import React from 'react'
import { Button, Form } from 'react-bootstrap'

const ReviewForm = ({ handleSubmit, revText, LabelText, defaultValue }) => {
  return (
    <Form>
      <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
        <Form.Label></Form.Label>
        <Form.Control as='textarea' row={3} defaultValue={defaultValue}></Form.Control>
      </Form.Group>
      <Button variant='outline-info' onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}

export default ReviewForm
