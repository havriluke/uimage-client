import React, { useEffect, useRef } from 'react'
import './about-block.scss'

const AboutBlock = (props) => {
  const refElem = useRef(null)

  useEffect(() => {
    if (!props.scroll) return
    window.scrollTo({top: refElem.current.offsetTop - 155, behavior: 'smooth'})
  }, [props.scroll])

  useEffect(() => {
    if (props.scrollPosition < refElem.current.offsetTop - 155 ||
      props.scrollPosition > refElem.current.offsetTop + refElem.current.offsetHeight) return
    props.activeFunc()
  }, [props.scrollPosition])

  return (
    <div className="about-block">
        <h2 ref={refElem} className="title">{props.title}</h2>
        {props.text.map((parag, index) => {
          return <p key={index} className="text">{parag}</p>
        })}
    </div>
  )
}

export default AboutBlock