import React, { useContext, useEffect, useState } from 'react'
import useNavBlock from '../../hooks/useNavBlock'
import AboutBlock from '../../components/about-block/AboutBlock'
import Navigation from '../../components/navigation/Navigation'
import { apiBlocks } from '../../utils/articles'
import './api.scss'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import Copy from '../../components/copy/Copy'
import refreshIcon from '../../assets/icons/refresh.svg'
import { editApiKey } from '../../http/userAPI'

const Api = observer(() => {
  const {user} = useContext(Context)
  const [apiKey, setApiKey] = useState('')

  const [activeIndex, scrollIndex, scrollPosition, onClickFunc, onScrollFunc] = useNavBlock(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (user.isAuth) setApiKey(user.user.apiKey)
  }, [])

  const refreshApiFunc = () => {
    editApiKey().then((data) => {
      setApiKey(data)
    })
  }

  return (
    <div className="api">
      <div className="container">

        <Navigation
            blocks={apiBlocks}
            activeIndex={activeIndex}
            clickFunc={onClickFunc}
        />

        <div className="content">
          {user.isAuth && <div className="current-api">
            <div className="api-label">{apiKey}</div>
            <div className="buttons">
              <Copy content={apiKey} size={25} />
              <div className="button thin" onClick={refreshApiFunc}>
                <img src={refreshIcon} />
              </div>
            </div>
          </div>}
          <div className="rapid-api-text">
            {!user.isAuth && <span>
              To use our API, you need to get 'x-api-key' header field. Register to get it.
            </span>}
            <span>Full instructions for using our API can be found <a href="#">here</a>.</span>
          </div>
          {apiBlocks.map((item, index) => {
            return <AboutBlock key={index}
              title={item.title}
              text={item.text}
              scrollPosition={scrollPosition}
              activeFunc={() => onScrollFunc(index)}
              scroll={index === scrollIndex} />
          })}
        </div>

      </div>
    </div>
  )
})

export default Api