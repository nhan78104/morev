import { Checkbox, Input } from 'antd'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import getUserInfo from '../../api/getUserInfo'
import userAuthentication from '../../api/userAuthentication'
import { Loading } from '../../components'
import { AuthContext } from '../../context/AuthProvider'
import './style.css'

const Login = () => {
  const { dispatch } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRemember, setIsRemember] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const handleAuthentication = async () => {
    try {
      const res = await userAuthentication({
        email,
        password,
      })

      if (isRemember) {
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
      } else {
        sessionStorage.setItem('accessToken', res.accessToken)
        sessionStorage.setItem('refreshToken', res.refreshToken)
      }
      dispatch({ type: 'SET_ACCESS_TOKEN', data: res.accessToken })
      const userData = await getUserInfo(res.accessToken)

      dispatch({ type: 'SET_USER', data: userData })

      setIsLoading(false)
      navigate('/')
    } catch (error) {
      setError(true)
      setIsLoading(false)
    }
  }

  const handleLogin = () => {
    // xử lý login
    setIsLoading(true)
    handleAuthentication()
  }

  const onCheckboxChange = (e) => {
    setIsRemember(e.target.checked)
  }

  return (
    <div className='login'>
      {isLoading && <Loading />}
      <div className='auth-form-container'>
        <h1 className='login-title'>Login</h1>
        <label form='email'>Email</label>
        <Input
          className='input-form'
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='Youremail@gmail.com'
        />
        <label form='password'>Password</label>
        <Input.Password className='input-form' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        {error && <span className='error'>Tài khoản hoặc mật khẩu sai.</span>}
        <div className='login-option'>
          <Checkbox onChange={onCheckboxChange} style={{ fontSize: '1rem' }}>
            Remember me.
          </Checkbox>
          <Link to='/forget-password' className='forget-option'>
            Forgot password?
          </Link>
        </div>

        <button className='login-btn' onClick={handleLogin}>
          Log In
        </button>
        <button
          className='link-btn'
          onClick={() => {
            navigate('/sign-up')
          }}
        >
          Don't have an account? Sign up here.
        </button>
      </div>
    </div>
  )
}

export default Login
