import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/LoginPage.css'

const LoginPage = () => {
  const [EmployeeID, setEmployeeID] = useState('')
  const [Password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(EmployeeID, Password)

    // call async api call here
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ EmployeeID, Password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      console.log(json)

      // store into local storage
      localStorage.setItem('token', json.token)
      localStorage.setItem('EmployeeID', json.EmployeeID)

      navigate('/dashboard', {replace: true})

    } catch (error) {
      console.log(error)
    }

    
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