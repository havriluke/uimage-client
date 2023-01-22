import React, { useState, useEffect } from 'react'
import AboutBlock from '../../components/about-block/AboutBlock'
import Navigation from '../../components/navigation/Navigation'
import useNavBlock from '../../hooks/useNavBlock'
import { mainBlocks } from '../../utils/articles'
import { useLocation } from 'react-router-dom'
import './about.scss'

const About = () => {
  const p = parseInt(useLocation().search.split('=')[1])

  const [activeIndex, scrollIndex, scrollPosition, onClickFunc, onScrollFunc] = useNavBlock(p)

  return (
    <div className='about'>
      <div className="container">

        <Navigation
          blocks={mainBlocks}
          activeIndex={activeIndex}
          clickFunc={onClickFunc}
        />

        <div className="content">
          {mainBlocks.map((item, index) => {
            return <AboutBlock key={index}
              title={item.title}
              text={item.text}
              scrollPosition={scrollPosition}
              activeFunc={() => onScrollFunc(index)}
              scroll={index === scrollIndex} />
          })}
        </div>

      </div>
    </div>
  )
}

export default About