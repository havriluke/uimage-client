import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import './profile.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { getInfo, getSelfInfo } from '../../http/userAPI'
import Loader from '../../components/loader/Loader'
import ProfilePanel from '../../components/profile-panel/ProfilePanel'
import AlbumBlock from '../../components/album-block/AlbumBlock'
import { MAIN_ROUTE } from '../../utils/consts'
import ListWrapper from '../../components/list-wrapper/ListWrapper'

const Profile = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation().pathname
  const [isLoading, setIsLoading] = useState(true)
  const [currentAlbums, setCurrentAlbums] = useState([])
  const [currentFavorites, setCurrentFavorites] = useState([])
  const [isSelf, setIsSelf] = useState(false)
  const [isFavorites, setIsFavorites] = useState(false)
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    setIsFavorites(false)
    const subdomain = location.split('/')[2]
    if (subdomain === user.user.username) {
      navigate(MAIN_ROUTE)
      return
    }
    const tempIsSelf = !subdomain
    setIsSelf(tempIsSelf)
    if (tempIsSelf) {
      getSelfInfo().then((data) => {
        setUserData(data)
      }).then(() => {
        setIsLoading(false)
      }).catch((err) => {
        console.log(err)
      })
    } else {
      getInfo(subdomain).then((data) => {
        setUserData(data)
      }).then(() => {
        setIsLoading(false)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [location])

  const loadAlbums = (page, limit) => {
    const b = limit + (page - 1) * 4
    setCurrentAlbums(userData.albums.slice(0, b))
  }
  const loadFavorites = (page, limit) => {
    const b = limit + (page - 1) * 4
    setCurrentFavorites(userData.favorites.slice(0, b))
  }

  if (isLoading) {
    return <Loader main />
  }
  
  return (
    <div className='profile'>
      <div className="container">

        <ProfilePanel
          username={userData.username}
          isSelf={isSelf}
          albums={userData.albums.length}
          images={userData.albums.map((album) => album.imagesCount).reduce((a, b) => a + b, 0)}
        />

        {isSelf && <div className="albums-types">
          <div className={`type ${isFavorites ? '' : 'active'}`} onClick={() => setIsFavorites(false)}>My albums</div>
          <div className={`type ${isFavorites ? 'active' : ''}`} onClick={() => setIsFavorites(true)}>Favorites</div>
        </div>}
        {!isSelf && <div className='gap'></div>}

        {!isFavorites && <ListWrapper limit={8} loadFunc={loadAlbums} count={currentAlbums.length}>
          <div className="albums">
            {currentAlbums.map((item, index) => {
              return <AlbumBlock key={index} data={item} />
            })}
          </div>
        </ListWrapper>}

        {!!isFavorites && <ListWrapper limit={8} loadFunc={loadFavorites} count={currentFavorites.length}>
          <div className="albums">
            {currentFavorites.map((item, index) => {
              return <AlbumBlock key={index} data={item} />
            })}
          </div>
        </ListWrapper>}

      </div>
    </div>
  )
})

export default Profile