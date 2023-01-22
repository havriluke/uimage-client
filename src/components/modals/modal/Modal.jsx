import React, { useEffect, useMemo, useState } from 'react'
import './modal.scss'

const Modal = (props) => {

    useEffect(() => {
        if (!props.active || !props.autoFocus) return
        setTimeout(() => {
            props.autoFocus.current.focus()
        }, 550)
    }, [props.active])

    useEffect(() => {
        const disableScrolling = () => {
            const x = window.scrollX
            const y = window.scrollY
            window.onscroll = () => window.scrollTo(x, y)
        }
        const enableScrolling = () => {
            window.onscroll = null
        }
        props.active ? disableScrolling() : enableScrolling()
    }, [props.active])

    return (
        <div className={`modal ${props.active ? 'active':''}`}>
            <div className="content">
                <div className="top">
                    {!!props.title && <div className="title">{props.title}</div>}
                </div>
                <div className="middle">
                    {props.children}
                </div>
                <div className="bottom">
                    <div className="buttons">
                        {!!props.modeFunc &&
                            <div
                                className={`mode ${props.modeFunc.styles}`}
                                onClick={props.modeFunc.func}
                            >
                                {props.modeFunc.title}
                            </div>
                        }
                        {!props.modeFunc && <div></div>}
                        <div className="right">
                            <div className="button thin" onClick={props.closeFunc}>Close</div>
                            {!!props.button && <div className="button" onClick={props.submitFunc}>{props.button}</div>}
                        </div>
                    </div>
                </div>
            </div>
            {!!props.error.length && <div className="error">
                {props.error}
            </div>}
        </div>
    )
}

export default Modal