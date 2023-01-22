import React, { useState, useEffect } from 'react'
import './image-view.scss'
import leftArrow from '../../../assets/icons/arrow-left.svg'
import rightArrow from '../../../assets/icons/arrow-right.svg'
import closeIcon from '../../../assets/icons/close.svg'
import fullscreenIcon from '../../../assets/icons/fullscreen.svg'
import fullscreenExitIcon from '../../../assets/icons/fullscreen-exit.svg'
import settingIcon from '../../../assets/icons/setting-black.svg'
import Copy from '../../copy/Copy'
import useWindowSize from '../../../hooks/useWindowSize'
import useSlideEvent from '../../../hooks/useSlideEvent'

const ImageView = ({modalActive, closeModal, data, moveFunc, isFirst, isLast, editFunc, isSelf}) => {
    const [fullscreen, setFullscreen] = useState(false)
    const [windowSize] = useWindowSize()

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

    useEffect(() => {
        const disableScrolling = () => {
            const x = window.scrollX
            const y = window.scrollY
            window.onscroll = () => window.scrollTo(x, y)
        }
        const enableScrolling = () => {
            window.onscroll = null
        }
        modalActive ? disableScrolling() : enableScrolling()
    }, [modalActive])

    useSlideEvent(closeModal, closeModal, moveLeft, moveRight, modalActive)

    return (
        <div className={`image-view ${modalActive ? 'active' : ''} ${fullscreen ? 'fullscreen' : ''}`}>

            {windowSize.width > 500 && <div className="control">
                <div className="left side">
                    {!isFirst && <div className="arrow" onClick={moveLeft}>
                        <img src={leftArrow}/>
                    </div>}
                </div>
                <div className="right side">
                    <div className="close" onClick={closeModal}>
                        <img src={closeIcon} />
                    </div>
                    {!isLast && <div className="arrow" onClick={moveRight}>
                        <img src={rightArrow} />
                    </div>}
                </div>
            </div>}

            <div className="content">
                <img src={data.url} className="photo" />
                <div className="bg"></div>
                <div className="center-bar">
                    {isSelf && <div className="edit" onClick={edit}>
                        <img src={settingIcon} />
                    </div>}
                    {/* <div className="download">
                        <img src={downloadIcon} />
                    </div> */}
                    <Copy content={data.url} size={40} />
                    <div className="fullscreen" onClick={() => setFullscreen(!fullscreen)}>
                        <img src={fullscreen ? fullscreenExitIcon : fullscreenIcon} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageView