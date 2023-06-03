import React, { useState, useContext } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'

export const Login = (props) => {
  const { setUser } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const navigate = useNavigate()

  const handleSubmit = () => {
    // xử lý login

    setUser(true) // sau chuyển true thành thông tin của user
    navigate('/') // login xong chuyển về trang chủ
  }

  return (
    <div className='Login'>
      <div className='auth-form-container'>
        <label form='email'>Email</label>
        <input
          className='input-form'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='Youremail@gmail.com'
          id='email'
          name='email'
        />
        <label form='password'>Password</label>
        <input
          className='input-form'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type='password'
          placeholder='Password'
          id='password'
          name='password'
        />
        <button className='login-btn' onClick={handleSubmit}>
          Log In
        </button>
        <button
          className='link-btn'
          onClick={() => {
            navigate('/sign-up')
          }}
        >
          Don't have an acount? Sign up here.
        </button>
      </div>
    </div>
  )
}
