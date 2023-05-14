import React, { useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [name, setName] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.prevenDefault()
    console.log(email)
  }
  return (
    <div className='signup'>
      <div className='auth-form-container'>
        <form className='register-form' onSubmit={handleSubmit}>
          <label htmlFor='name'>Full name</label>
          <input value={name} name='name' id='name' placeholder='full Name' />
          <label htmlFor='email'>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='youremail@gmail.com'
            id='email'
            name='email'
          />
          <label htmlFor='password'>Password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type='password'
            placeholder='password'
            id='password'
            name='password'
          />
          <button className='signup-btn' type='submit'>
            Sign Up
          </button>
        </form>
        <button className='link-btn' onClick={() => { navigate('/login') }}>
          Already have an acount? Login here.{' '}
        </button>
      </div>
    </div>
  )
}
