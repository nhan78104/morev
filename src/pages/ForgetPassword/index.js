import { CheckCircleFilled } from '@ant-design/icons'
import { Result } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import requestResetPassword from '../../api/requestResetPassword'
import { Loading } from '../../components/index'
import './style.css'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(false)

  const handleOnClick = async () => {
    try {
      setIsLoading(true)
      await requestResetPassword(email)
      setStatus(true)
      setIsLoading(false)
    } catch (error) {
      console.error('forgot password error: ' + error)
      setStatus(false)
      setIsLoading(false)
    }
  }

  return status ? (
    <div className='forget-password-container'>
      <div className='success-container'>
        <Result
          icon={<CheckCircleFilled style={{ color: '#5bcae8' }} />}
          status='success'
          title='Email sent successfully!'
          subTitle={<Link to='/'>Back to home.</Link>}
        />
      </div>
    </div>
  ) : (
    <div className='signup'>
      {isLoading && <Loading />}
      <div className='auth-form-container'>
        <h1 className='signup-title'>Change Password</h1>
        <label htmlFor='email'>Password</label>
        <input
          className='input-form'
          value={email}
          name='email'
          type='email'
          id='email'
          placeholder='Type your email....'
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <button className='signup-btn' onClick={handleOnClick}>
          Send
        </button>
      </div>
    </div>
  )
}

export default ForgetPassword
