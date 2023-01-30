import React, { useState, useEffect } from 'react'
import './image-view.scss'
import leftArrow from '../../../assets/icons/arrow-left.svg'
import rightArrow from '../../../assets/icons/arrow-right.svg'
import closeIcon from '../../../assets/icons/close.svg'
import closeIconW from '../../../assets/icons/white/close.svg'
import fullscreenIcon from '../../../assets/icons/white/fullscreen.svg'
import fullscreenExitIcon from '../../../assets/icons/white/fullscreen-exit.svg'
import settingIcon from '../../../assets/icons/white/setting.svg'
import Copy from '../../copy/Copy'
import useWindowSize from '../../../hooks/useWindowSize'
import useSlideEvent from '../../../hooks/useSlideEvent'

const ImageView = ({modalActive, closeModal, data, moveFunc, isFirst, isLast, editFunc, isSelf, index, count}) => {
    const [fullscreen, setFullscreen] = useState(false)
    const [windowSize] = useWindowSize()
    const [controlsActive, setControlsActive] = useState(false)
    const [scrollCoords, setScrollCoords] = useState(0)

    const moveLeft = () => {
        if (isFirst) return
        moveFunc('left')
    }
    const moveRight = () => {
        if (isLast) return
        moveFunc('right')
    }

    const edit = () => {
        editFunc()
    }

    const mousemoveFunc = () => {
        if (controlsActive) return
        setControlsActive(true)
        setTimeout(() => {
            setControlsActive(false)
        }, 1000 * 5)
    }

    useEffect(() => {
        if (modalActive) setScrollCoords(window.scrollY)
    }, [modalActive])

    useSlideEvent(()=>{}, ()=>{}, moveLeft, moveRight, modalActive)

    return (
        <>
        {modalActive && <div onMouseMove={mousemoveFunc} onClick={mousemoveFunc} className={`image-view ${fullscreen ? 'fullscreen' : ''}`}>

            <div className={`control ${controlsActive ? 'active' : ''}`}>
                {windowSize.width > 500 && <div className="left side">
                    {!isFirst && <div className="arrow" onClick={moveLeft}>
                        <img src={leftArrow}/>
                    </div>}
                </div>}
                {windowSize.width > 500 && <div className="right side">
                    <div className="close" onClick={closeModal}>
                        <img src={closeIcon} />
                    </div>
                    {!isLast && <div className="arrow" onClick={moveRight}>
                        <img src={rightArrow} />
                    </div>}
                </div>}
                {windowSize.width < 500 && <div onClick={closeModal} className="close-mobile">
                    <img src={closeIconW} />
                </div>}
                <div className="count">
                    <span>{index+1} / {count}</span>
                </div>
                <div className="bottom">
                    <div className="title">{data.name}</div>
                    <div className="icons">
                        {isSelf && <div className="edit" onClick={edit}>
                            <img src={settingIcon} />
                        </div>}
                        <Copy content={data.url} size={30} white />
                        <div className="fullscreen" onClick={() => setFullscreen(!fullscreen)}>
                            <img src={fullscreen ? fullscreenExitIcon : fullscreenIcon} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="content">
                <img src={data.url} className="photo" />
            </div>
        </div>}
        </>
        
    )
}

export default ImageView