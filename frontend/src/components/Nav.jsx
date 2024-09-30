import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  const logoutsystem = () => {
    localStorage.removeItem('token'); 
    console.log("Logout Done")
  }
  return (
    <div>
      <nav>
      <Link  to='/api/login'>Login</Link>
      <Link   to='/api/registration'>RegisterEmployee</Link> 
      <button onClick={()=>{logoutsystem()}}>LogOut</button>
      </nav>
    </div>
  )
}

export default Nav
