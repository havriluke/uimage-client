import React, { useState } from 'react'
import copyLogo from '../../assets/icons/copy.svg'
import doneLogo from '../../assets/icons/done.svg'

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
            <img src={isActive ? doneLogo : copyLogo} />
        </div>
    )
}

export default Copy