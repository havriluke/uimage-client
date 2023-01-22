import React, { useEffect, useState } from 'react'
import './album-block.scss'
import lockIcon from '../../assets/icons/lock.svg'
import starIcon from '../../assets/icons/star-fill-white.svg'
import { useNavigate } from 'react-router-dom'
import { ALBUM_ROUTE } from '../../utils/consts'

const AlbumBlock = (props) => {
    const navigate = useNavigate()
    const [bg, setBg] = useState({backgroundColor: '#fff'})

    useEffect(() => {
        if (!!props.data.lastImage) {
            setBg({ backgroundImage: `url(${props.data.lastImage})` })
        } else {
            setBg({ backgroundColor: 'transparent' })
        }
    }, [props.data])

    return (
        <>
        <div className='album-block' >
            <div className="album-photo" style={bg}></div>
            <div className="album-gradient" onClick={() => navigate(ALBUM_ROUTE +'/'+ props.data.code)}></div>
            
            <div className="icons">
                {props.data.private && <img src={lockIcon} className="icon" />}
                {props.data.favorite && <img src={starIcon} className="icon" />}
            </div>
            <div className="title">{props.data.name}</div>
        </div>
        </>
    )
}

export default AlbumBlock