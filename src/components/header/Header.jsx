import React, {useState} from 'react'
import './header.scss'
import Modal from '../../components/modals/modal/Modal'
import AuthModal from '../modals/auth-modal/AuthModal'

const Header = () => {
  const [modalActive, setModalActive] = useState(false)

  const openModal = () => {
      setModalActive(true)
  }
  const closeModal = () => {
      setModalActive(false)
  }
  
  return (
    <>  
      <AuthModal modalActive={modalActive} closeModal={closeModal} />

      <div className='header'>
        <div className="container">
          <h1 className="title">Best image cloud storage.</h1>
          <p className="descr">Free secure service for sharing and storing images. Use our API to manage albums and pictures.</p>
          <div className="button big" onClick={openModal}>Get started</div>
        </div>
      </div>
    </>
    
  )
}

export default Header