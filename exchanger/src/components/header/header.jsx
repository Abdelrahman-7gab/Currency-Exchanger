import React from 'react'
import "./header.css"
import logo from '../../assets/logo.png'

function header() {
  return (
    <header className='header-container'>
      <img className='logo' src={logo} />
      Exchanger
      </header>
  )
}

export default header