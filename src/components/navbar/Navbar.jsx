import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Context } from '../..'
import { ABOUT_ROUTE, API_ROUTE, PREMIUM_ROUTE, MAIN_ROUTE } from '../../utils/consts'
import './navbar.scss'
import logo from '../../assets/logo.svg'
import searchLogo from '../../assets/icons/search.svg'
import logoutLogo from '../../assets/icons/logout.svg'
import menuLogo from '../../assets/icons/menu.svg'
import closeLogo from '../../assets/icons/close.svg'
import { useNavigate, useLocation } from 'react-router-dom'
import SearchModal from '../modals/search-modal/SearchModal'
import { logout } from '../../http/userAPI'
import useWindowSize from '../../hooks/useWindowSize'

const Navbar = observer(() => {
  const {user} = useContext(Context)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate(null)
  const [searchModal, setSearchModal] = useState(false)
  const location = useLocation().pathname
  const [windowSize] = useWindowSize()
  const [burgerActive, setBurgerActive] = useState(true)
  const mobileSize = useMemo(() => {
    return windowSize.width <= 900
  }, [windowSize.width])

  useEffect(() => {
    window.self.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY >= 60)
    })
  }, [])

  useEffect(() => {
    window.scrollTo({top: 0})
    setBurgerActive(false)
  }, [location])

  const logoutFunc = () => {
    logout().then(() => {
      navigate(0)
    })
  }

  const navlist = [
    {title: '', image: searchLogo, onclick: () => setSearchModal(true), auth: false, icon: true},
    {title: 'About', image: null, onclick: () => navigate(ABOUT_ROUTE), auth: true, icon: false},
    {title: 'API', image: null, onclick: () => navigate(API_ROUTE), auth: true, icon: false},
    {title: 'Premium', image: null, onclick: () => navigate(PREMIUM_ROUTE), auth: true, icon: false},
    {title: '', image: logoutLogo, onclick: logoutFunc, auth: false, icon: true},
  ]

  return (
    <>
    <SearchModal modalActive={searchModal} closeModal={() => setSearchModal(false)}/>
    <div className={`gradient-bg ${location === '/' && !user.isAuth ? 'big' : ''}`}></div>
    <div className={`navbar ${isScrolled?'scrolled':''}`}>
      <div className="container">
        <div className="logo" onClick={() => navigate(MAIN_ROUTE)}>
          <img src={logo} alt="uimageLogo" />
          <span>uimage</span>
        </div>
        <ul className="navlist">
          {navlist.map((li, index) => {
            if (!user.isAuth && !li.auth) return
            return <li key={index}
              className={li.icon ? 'icon' : 'label'}
              onClick={li.onclick}>
                {li.title}<img src={li.image}/>
            </li>
          })}
          {mobileSize && <li onClick={() => setBurgerActive(true)} className='icon'>
            <img src={menuLogo} />
          </li>}
        </ul>
      </div>
      
      {mobileSize && <div className={`mobile-menu ${burgerActive && 'active'}`}>
        <div className="button thin" onClick={() => setBurgerActive(false)}><img src={closeLogo} /></div>
        <ul className="navlist">
          {navlist.map((li, index) => {
            if (li.icon) return
            return <li key={index} className='label'
              onClick={li.onclick}>
                {li.title}<img src={li.image}/>
            </li>
          })}
        </ul>
      </div>}

    </div>
    </>
    
  )
})

export default Navbar