import React, {useState, useEffect} from 'react'

const useWindowSize = (p) => {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize())
        }
        window.addEventListener('resize', handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    function getWindowSize() {
        const {innerWidth, innerHeight} = window
        return {width: innerWidth, height: innerHeight}
    }

    return [windowSize]
}

export default useWindowSize