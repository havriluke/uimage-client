
import React, { useMemo } from 'react'
import './image-block.scss'
import settingIcon from '../../assets/icons/setting.svg'

const ImageBlock = (props) => {
    const bg = useMemo(() => {
        return { backgroundImage: `url(${props.data.url})` }
    }, [])

    const click = () => {
        props.clickFunc()
    }
    
    return (
        <>
        <div className='image-block' >
            <div className="image-photo" style={bg}></div>
            <div className="image-gradient" onClick={click}></div>
            
            <div className="bottom">
                <div className="title">{props.data.name}</div>
                
            </div>
            
        </div>
        </>
    )
}

export default ImageBlock