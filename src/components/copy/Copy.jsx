import React, { useState } from 'react'

import copyLogoB from '../../assets/icons/copy.svg'
import doneLogoB from '../../assets/icons/done.svg'

import copyLogoW from '../../assets/icons/white/copy.svg'
import doneLogoW from '../../assets/icons/white/done.svg'


const Copy = (props) => {
    const [isActive, setIsActive] = useState(false)
    

    const copyFunc = async () => {
        await navigator.clipboard.writeText(props.content)
        setIsActive(true)
        setTimeout(() => {
            setIsActive(false)
        }, 5000)
    }

    return (
        <div className='copy button thin' style={{width: props.size, height: props.size}}
            onClick={isActive ? null : copyFunc}
        >
            <img src={isActive ? (props.white ? doneLogoW : doneLogoB) : (props.white ? copyLogoW : copyLogoB)} />
        </div>
    )
}

export default Copy