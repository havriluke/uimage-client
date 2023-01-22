import React from 'react'
import './loader.scss'
import logo from '../../assets/logo.png'

const Loader = (props) => {

  return (
    <div className={`loader ${props.main ? 'main' : ''}`}>
      <img src={logo} alt="" />
    </div>
  )
}

export default Loader