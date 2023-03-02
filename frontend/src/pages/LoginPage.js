import React, { useState } from 'react'
import '../css/LoginPage.css'

const LoginPage = () => {
  const [EmployeeID, setEmployeeID] = useState('')
  const [Password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    console.log(EmployeeID, Password)
  }

  return (
    <div className="login-container">
      <div className="login-element">
        <h2 className="login-header">
          Welcome to DBSClaims
        </h2>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="login-form-field">
            <label>EmployeeID</label>
            <input 
              type="number"
              value={EmployeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
            />
          </div>

          <div className="login-form-field">
            <label>Password</label>
            <input 
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage