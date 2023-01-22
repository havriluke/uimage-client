import React, { useState } from 'react'
import './main.scss'
import Header from '../../components/header/Header'
import MainBlock from '../../components/main-block/MainBlock'
import { mainBlocks } from '../../utils/articles'
import Plans from '../../components/plans/Plans'
import { PREMIUM_ROUTE } from '../../utils/consts'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const navigate = useNavigate(null)

  return (
    <div className="main">
      <Header />
      <div className="content container">

        <div className="whatis">
          <div className="title">What is uimage?</div>
          <p className="text">The best free cloud storage for images is uimage, which provides free storage for images, as well as an open, free API for developers. With uimage, you can store, share, and access all of your images securely in the cloud.</p>
          <p className="text">The service offers enhanced security, encryption, and privacy features that keep your images safe from unauthorized access. You can access your images from any device, anywhere, at any time.</p>
          <p className="text">It's fast, easy, and secure - the perfect solution for image cloud storage.</p>
        </div>

        <div className="main-blocks">
          {mainBlocks.map((item, index) => {
            return <MainBlock key={index} image={item.img} title={item.title} text={item.text} reversed={index % 2 !== 0} i={index} />
          })}
        </div>

        <div className="premium-bar">
          <div className="title">Subscribe to Premium for only $1.99 per month</div>
          <div className="button thin more" onClick={() => {navigate(PREMIUM_ROUTE)}}><div>Learn more</div></div>
        </div>

      </div>

    </div>
    
  )
}

export default Main