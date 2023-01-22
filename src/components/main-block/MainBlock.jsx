import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ABOUT_ROUTE } from '../../utils/consts'
import './main-block.scss'

const MainBlock = ({image, title, text, reversed, i}) => {
    const navigate = useNavigate(null)

    return (
        <div className={`main-block ${reversed ? 'r':''}`}>
            <div className="image-content" style={{backgroundImage: `url(${image})`}}></div>
            <div className="text-content">
                <h2 className="title">{title}</h2>
                {text.map((parag, index) => {
                    return <p key={index} className='text'>{parag}</p>
                })}
                <div className="button thin more" onClick={() => {navigate(ABOUT_ROUTE + `?p=${i}`)}}><div>Learn more</div></div>
            </div>
        </div>
    )
}

export default MainBlock