import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../..'
import ImageBlock from '../../components/image-block/ImageBlock'
import ListWrapper from '../../components/list-wrapper/ListWrapper'
import Loader from '../../components/loader/Loader'
import EditImageModal from '../../components/modals/edit-image-modal/EditImageModal'
import ImageView from '../../components/modals/image-view/ImageView'
import ProfilePanel from '../../components/profile-panel/ProfilePanel'
import { getInfo } from '../../http/albumAPI'
import { MAIN_ROUTE } from '../../utils/consts'
import './album.scss'

const Album = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation().pathname
  const navigate = useNavigate()
  const albumCode = useMemo(() => location.split('/')[2], [location])
  const [albumData, setAlbumData] = useState({})
  const [currentImages, setCurrentImages] = useState([])
  const [isSelf, setIsSelf] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [imageActiveIndex, setImageActiveIndex] = useState(-1)
  const [editImageModal, setEditImageModal] = useState(-1)

  useEffect(() => {
    if (!albumCode) return
    getInfo(albumCode).then((data) => {
      setAlbumData(data)
      console.log(data);
      setIsSelf(data.author.username === user.user.username)
    }).then(() => {
      setIsLoading(false)
    }).catch((err) => {
      navigate(MAIN_ROUTE)
    })
  }, [albumCode])

  const move = (dir) => {
    const step = dir === 'left' ? -1 : 1
    setImageActiveIndex(imageActiveIndex + step)
  }

  const load = (page, limit) => {
    const b = limit + (page - 1) * 4
    setCurrentImages(albumData.images.slice(0, b))
  }

  if (isLoading) {
    return <Loader main />
  }

  return (
    <div className='album'>
      <ImageView
        modalActive={imageActiveIndex > -1}
        closeModal={() => setImageActiveIndex(-1)}
        data={imageActiveIndex > -1 ? albumData.images[imageActiveIndex] : {}}
        moveFunc={move}
        editFunc={() => setEditImageModal(imageActiveIndex)}
        isSelf={isSelf}
        isFirst={imageActiveIndex === 0}
        isLast={imageActiveIndex === albumData.images.length - 1}
        index={imageActiveIndex}
        count={albumData.images.length}
      />

      <EditImageModal
        modalActive={editImageModal > -1}
        closeModal={() => setEditImageModal(-1)}
        imageName={editImageModal === -1 ? '' : albumData.images[editImageModal].name}
        albumName={editImageModal === -1 ? '' : albumData.name}
      />

      <div className="container">

      <ProfilePanel
        username={albumData.author.username}
        albumname={albumData.name}
        albumcode={albumCode}
        isFavorite={albumData.favorite}
        isPrivate={albumData.private}
        isSelf={isSelf}
        follows={0} followers={0}
      />

      <ListWrapper limit={8} loadFunc={load} count={albumData.images.length}>
      <div className="images">
        {currentImages.map((item, index) => {
          return <ImageBlock key={index}
            data={item}
            isSelf={isSelf}
            clickFunc={() => setImageActiveIndex(index)}
          />
        })}
      </div>
      </ListWrapper>

      </div>

    </div>
  )
})

export default Album