import React, { useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [name, setName] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.prevenDefault()
  }

  return (
    <div className='signup'>
      <div className='auth-form-container'>
        <form className='register-form' onSubmit={handleSubmit}>
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
          <button className='signup-btn' type='submit'>
            Sign Up
          </button>
        </form>
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
