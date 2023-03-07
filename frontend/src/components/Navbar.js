import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className='navbar-container'>
      <div className='navbar-left-container'>
        <Link to='/login' className='navbar-link'>
          <h1>DBSClaims</h1>
        </Link>
      </div>

      
      { user ? (
        <div className='navbar-right-container'>
          <Link to='/dashboard' className='navbar-link navbar-right'>
            <h2>Claims</h2>
          </Link>
          <Link to='/create-claim' className='navbar-link navbar-right'>
            <h2>Create</h2>
          </Link>
          <Link to='/login' className='navbar-link navbar-right'>
            <h2 onClick={handleLogout}>Logout</h2>
          </Link>
        </div>
      ) : (
        <div className='navbar-right-container'>
          Login
        </div>
      )}
    </header>
  )
}

export default Navbar