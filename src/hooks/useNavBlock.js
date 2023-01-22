
import React, {useState, useEffect} from 'react'

const useNavBlock = (p) => {
    const [activeIndex, setActiveIndex] = useState(p)
    const [scrollIndex, setScrollIndex] = useState(p)
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        window.self.addEventListener('scroll', () => {
            setScrollPosition(window.scrollY)
        })
    }, [])

    const onClickFunc = (index) => {
        setActiveIndex(index)
        setScrollIndex(index)
    }

    const onScrollFunc = (index) => {
        setActiveIndex(index)
        setScrollIndex(-1)
    }

    return [activeIndex, scrollIndex, scrollPosition, onClickFunc, onScrollFunc]
}

export default useNavBlock