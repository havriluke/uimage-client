import React from 'react'
import './footer.scss'
import logo from '../../assets/logo-white.svg'

const Footer = () => {

    return (
        <footer className='footer'>
            <div className="content container">

                <div className="logo-content">
                    <div className="logo"><img src={logo} alt="" /></div>
                    <div className="title">uimage</div>
                </div>

                <div className="list-content">
                    
                    <div className="list-item">Privacy policy</div>
                    <div className="medias">
                        <div className="media "><box-icon type="logo" name="instagram" color="#F1FFE7"></box-icon></div>
                        {/* <div className="media"><box-icon type="logo" name="telegram" color="#ffffff"></box-icon></div> */}
                        <div className="media"><box-icon type="logo" name="facebook" color="#F1FFE7"></box-icon></div>
                    </div> 
                     
                </div>
            </div>
        </footer>
    )
}

export default Footer