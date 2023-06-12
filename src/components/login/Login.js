import { Input } from 'antd'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import getUserInfo from '../../api/getUserInfo'
import userAuthentication from '../../api/userAuthentication'
import { AuthContext } from '../../context/AuthProvider'
import Loading from '../loading/Loading'
import './style.css'

export const Login = (props) => {
  const { setUser, setIsLoggedIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const handleAuthentication = async () => {
    try {
      const res = await userAuthentication({
        email,
        password,
      })

      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)

      const user = await getUserInfo(res.accessToken)

      setUser(user)
      setIsLoggedIn(true)
      setIsLoading(false)
      navigate('/')
    } catch (error) {
      setError(true)
      setIsLoggedIn(false)
      setIsLoading(false)
    }
  }

  const handleLogin = () => {
    // xử lý login
    setIsLoading(true)
    handleAuthentication()
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
