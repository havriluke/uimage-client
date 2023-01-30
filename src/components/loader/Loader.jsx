import React from 'react'
import './loader.scss'
import logo from '../../assets/logo.png'

const Loader = (props) => {

  return (
    <div
        className={`loader ${props.small ? 'small' : ''}`}
        style={{width: props.size, height: props.size}}
      >
        <img src={logo} />
    </div>
  )
}

export default Loader