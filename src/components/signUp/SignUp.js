import React, { useContext, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'

export const SignUp = () => {
  const { setUser } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [name, setName] = useState('')

  const navigate = useNavigate()

  const handleSubmit = () => {
    // xử lý signup

    // xong thì tự động login
    setUser(true) // sau chuyển true thành thông tin của user
    navigate('/') // login xong chuyển về trang chủ
  }

  return (
    <div className='signup'>
      <div className='auth-form-container'>
        <label htmlFor='name'>Full name</label>
        <input
          className='input-form'
          value={name}
          name='name'
          id='name'
          placeholder='Full Name'
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
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
        <label htmlFor='password'>Password</label>
        <input
          className='input-form'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type='password'
          placeholder='Password'
          id='password'
          name='password'
        />
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
  )
}
