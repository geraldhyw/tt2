import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/LoginPage.css'
import { useLogin } from '../hooks/useLogin'

const LoginPage = () => {
  const [EmployeeID, setEmployeeID] = useState('')
  const [Password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login, error, isLoading } = useLogin()

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(EmployeeID, Password)

    // call async api call here
    login(parseInt(EmployeeID), Password)
    // navigate('/dashboard', { replace: true })
  }

  return (
    <div className="login-container">
      <div className="login-element">
        <div className="login-header">
          <h1>Welcome to <span className="login-dbs">DBSClaims</span></h1>
        </div>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="login-form-field">
            <label className="login-label">EmployeeID</label>
            <input 
              className="login-input"
              type="number"
              value={EmployeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
            />
          </div>

          <div className="login-form-field">
            <label className="login-label">Password</label>
            <input 
              className="login-input"
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-button btn" type="submit">
            <h3>Log In</h3>
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage