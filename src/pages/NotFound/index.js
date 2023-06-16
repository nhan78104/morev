import { Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='forget-password-container'>
      <div className='success-container'>
        <Result status='error' title='This page not found!' subTitle={<Link to='/'>Back to home.</Link>} />
      </div>
    </div>
  )
}

export default NotFound
