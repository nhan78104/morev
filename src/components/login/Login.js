import React, { useState } from "react";
import './style.css'
import { useNavigate } from 'react-router-dom'

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.prevenDefault();
    console.log(email);
  }
  return (
    <div className="Login">
      <div className="auth-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label form="email">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Youremail@gmail.com" id="email" name="email" />
          <label form="password">Password</label>
          <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="******" id="password" name="password" />
          <button className="login-btn" type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => { navigate('/sign-up') }}>Don't have an acount? Sign up here. </button>
      </div>
    </div>
  )
}