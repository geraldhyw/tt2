import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'

const Navbar = () => {
  return (
    <header className='navbar-container'>
      <div className='navbar-left-container'>
        <Link to='/login' className='navbar-link'>
          <h1>DBSClaims</h1>
        </Link>
      </div>

      <div className='navbar-right-container'>
        <Link to='/dashboard' className='navbar-link navbar-right'>
          <h2>Claims</h2>
        </Link>
        <Link to='/create-claim' className='navbar-link navbar-right'>
          <h2>Create</h2>
        </Link>
      </div>
    </header>
  )
}

export default Navbar