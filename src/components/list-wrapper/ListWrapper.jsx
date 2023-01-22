import React, { useEffect, useRef, useState } from 'react'
import './list-wrapper.scss'

const ListWrapper = (props) => {
    const lineRef = useRef(null)

    let page = 1
    const load = () => {
        props.loadFunc(page, props.limit)
        page++
    }

    let prevDif = 0
    const loadFunc = () => {
        if (!lineRef.current) return
        if (props.limit * (page - 1) >= props.count) return
        const dif = lineRef.current.getBoundingClientRect().top - window.innerHeight
        if (dif < 0 && prevDif >= 0) {
            load()
        }
        prevDif = dif
    }
    useEffect(() => {
        load()
        window.self.addEventListener('scroll', loadFunc)
    }, [])

    return (
        <div className='list-wrapper'>
            {props.children}
            <div className="list-line" ref={lineRef}></div>
        </div>
    )
}

export default ListWrapper