import React, { useContext, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import createUser from '../../api/createUser'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export const SignUp = () => {
  const { setUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [fullNameError, setFullNameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [defaultError, setDefaultError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    // xử lý signup
    try {
      setIsLoading(true)
      const res = await createUser({
        email,
        password,
        fullName,
      })

      console.log(res)

      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)

      setIsLoading(false)
      setUser(true) // sau chuyển true thành thông tin của user
      navigate('/') // login xong chuyển về trang chủ
    } catch (error) {
      setFullNameError(null)
      setPasswordError(null)
      setEmailError(null)
      setDefaultError(null)

      error.forEach((err) => {
        switch (err.field) {
          case 'email':
            setEmailError(err.detail)
            break
          case 'password':
            setPasswordError(err.detail.split(/\n/))
            break
          case 'fullName':
            setFullNameError(err.detail)
            break
          default:
            setDefaultError(err.detail)
            break
        }
      })
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className='signup'>
        {isLoading && (
          <div className='background-blur'>
            <Spin indicator={<LoadingOutlined />} className='loading' tip='Loading...' size='large' />
          </div>
        )}
        <div className='auth-form-container'>
          <label htmlFor='name'>Full name</label>
          <input
            className='input-form'
            value={fullName}
            name='name'
            id='name'
            placeholder='Full Name'
            onChange={(e) => {
              setFullName(e.target.value)
            }}
          />
          {fullNameError && <span className='error'>{fullNameError}</span>}
          <label htmlFor='email'>Email</label>
          <input
            className='input-form'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='youremail@gmail.com'
            id='email'
            name='email'
          />
          {emailError && <span className='error'>{emailError}</span>}
          <label htmlFor='password'>Password</label>
          <input
            className='input-form'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            id='password'
            name='password'
          />
          {passwordError &&
            passwordError.map((error, index) => (
              <span className='error' key={index}>
                {error}
              </span>
            ))}
          {defaultError && <span className='error'>{defaultError}</span>}
          <button className='signup-btn' onClick={handleSubmit}>
            Sign Up
          </button>
          <button
            className='link-btn'
            onClick={() => {
              navigate('/login')
            }}
          >
            Already have an acount? Login here.
          </button>
        </div>
      </div>
    </>
  )
}
