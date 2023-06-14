import { CheckCircleFilled } from '@ant-design/icons'
import { Result } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import resetPassword from '../../api/resetPassword'
import { Loading } from '../../components/index'

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const [resetCode, setResetCode] = useState('')
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [retypePasswordError, setRetypePasswordError] = useState('')
  const [status, setStatus] = useState(false)

  useEffect(() => {
    setResetCode(searchParams.get('code'))
  }, [searchParams])

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await resetPassword(resetCode, password, retypePassword)
      setStatus(true)
      setIsLoading(false)
    } catch (error) {
      setStatus(false)
      setPasswordError('')
      setRetypePasswordError('')
      error.forEach((err) => {
        switch (err.field) {
          case 'password':
            setPasswordError(err.detail.split(/\n/))
            break
          case 'retypePassword':
            setRetypePasswordError(err.detail.split(/\n/))
            break
          default:
            break
        }
      })
      setIsLoading(false)
    }
  }

  //tach result ra thanh components rieng
  return status ? (
    <div className='forget-password-container'>
      <div className='success-container'>
        <Result
          icon={<CheckCircleFilled style={{ color: '#5bcae8' }} />}
          status='success'
          title='Password changed successfully!'
          subTitle={<Link to='/'>Back to home.</Link>}
        />
      </div>
    </div>
  ) : (
    <div className='signup'>
      {isLoading && <Loading />}
      <div className='auth-form-container'>
        <h1 className='signup-title'>Change Password</h1>
        <label htmlFor='password'>Password</label>
        <input
          className='input-form'
          value={password}
          name='password'
          type='password'
          id='password'
          placeholder='Type password....'
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        {passwordError &&
          passwordError.map((error, index) => (
            <span className='error' key={index}>
              {error}
            </span>
          ))}
        <label htmlFor='password-retype'>Re-Type Password</label>
        <input
          className='input-form'
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
          type='password'
          placeholder='Re-Type your password...'
          id='password-retype'
          name='password-retype'
        />
        {retypePasswordError &&
          retypePasswordError.map((error, index) => (
            <span className='error' key={index}>
              {error}
            </span>
          ))}
        <button className='signup-btn' onClick={handleSubmit}>
          Reset Password
        </button>
      </div>
    </div>
  )
}

export default ResetPassword
