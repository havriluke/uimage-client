
import React from 'react'
import './navigation.scss'

const Navigation = (props) => {
        
    return (
        <div className="navigation">
          {props.blocks.map((item, index) => {
            return <div key={index}
                className={`button thin ${index === props.activeIndex ? 'active' : ''}`}
                onClick={() => {props.clickFunc(index)}}
              >
                <div className="title">{item.title}</div>
                <img src={index === props.activeIndex ? item.imgActive : item.imgDisable} />
              </div>
          })}
        </div>
    )
}

export default Navigation