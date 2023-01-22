
import React, {useState, useEffect} from 'react'

const useSlideEvent = (upFunc, downFunc, leftFunc, rightFunc, active) => {
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)

    const touchStartFunc = (e) => {
        // e.preventDefault()
        setTouchStart({x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY})
    }
    const touchEndFunc = (e) => {
        // e.preventDefault()
        setTouchEnd({x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY})
    }

    useEffect(() => {
        if (active) {
            window.self.addEventListener('touchstart', touchStartFunc)
            window.self.addEventListener('touchend', touchEndFunc)
        } else {
            window.self.removeEventListener('touchstart', touchStartFunc)
            window.self.removeEventListener('touchend', touchEndFunc)
        }
    }, [active])

    useEffect(() => {
        setTouchEnd(null)
    }, [touchStart])

    useEffect(() => {
        if (!touchEnd || !touchStart) return
        const diffX = touchStart.x - touchEnd.x
        const diffY = touchStart.y - touchEnd.y
        const d = 10
        if (Math.abs(diffX) < d && Math.abs(diffY) < d) return
        if (Math.abs(diffX) > Math.abs(diffY)) {
            diffX > 0 ? rightFunc() : leftFunc()
        } else upFunc()
    }, [touchEnd])

}

export default useSlideEvent

// upFunc, downFunc, leftFunc, rightFunc