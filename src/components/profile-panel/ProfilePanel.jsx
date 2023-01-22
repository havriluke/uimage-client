import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CLIENT_URL, PROFILE_ROUTE } from '../../utils/consts'
import './profile-panel.scss'
import lockIcon from '../../assets/icons/lock-black.svg'
import starIcon from '../../assets/icons/star-outline.svg'
import startFillIcon from '../../assets/icons/star-fill.svg'
import settingIcon from '../../assets/icons/setting-black.svg'
import addIcon from '../../assets/icons/add.svg'
import uploadIcon from '../../assets/icons/upload.svg'
import EditUserModal from '../modals/edit-user-modal/EditUserModal'
import EditAlbumModal from '../modals/edit-album-modal/EditAlbumModal'
import CreateAlbumModal from '../modals/create-album-modal/CreateAlbumModal'
import UploadImagesModal from '../modals/upload-images-modal/UploadImagesModal'
import SecureModal from '../modals/secure-modal/SecureModal'
import { toggleFavorites } from '../../http/albumAPI'
import Copy from '../copy/Copy'
import useWindowSize from '../../hooks/useWindowSize'

const ProfilePanel = (props) => {
    const navigate = useNavigate()
    const [editUserModal, setEditUserModal] = useState(false)
    const [editAlbumModal, setEditAlbumModal] = useState(false)
    const [createAlbumModal, setCreateAlbumModal] = useState(false)
    const [uploadImagesModal, setUploadImagesModal] = useState(false)
    const [secureModal, setSecureModal] = useState(false)
    const [favorite, setFavorite] = useState(props.isFavorite)
    const [windowSize] = useWindowSize()
 
    const favoriteClick = (code) => {
        toggleFavorites(code).then((data) => {
            setFavorite(!favorite)
        }).catch((err) => {
            console.log(err.response.data.message)
        })
    }

    return (
        <>
        {!props.albumname && <EditUserModal modalActive={editUserModal} closeModal={() => setEditUserModal(false)} />}
        {!!props.albumname && <EditAlbumModal modalActive={editAlbumModal} closeModal={() => setEditAlbumModal(false)} name={props.albumname} />}
        {!props.albumname && <CreateAlbumModal modalActive={createAlbumModal} closeModal={() => setCreateAlbumModal(false)}/>}
        {!!props.albumname && <UploadImagesModal modalActive={uploadImagesModal} closeModal={() => setUploadImagesModal(false)} name={props.albumname} />}
        {!!props.albumname && props.isSelf && <SecureModal modalActive={secureModal} closeModal={() => setSecureModal(false)} name={props.albumname}/>}
        <div className="panel">

            <div className="names">
                <div className="username" onClick={() => navigate(PROFILE_ROUTE +'/'+ props.username)}>
                    {props.username}
                </div>
                {!!props.albumname && <>
                    <p>/</p><div className="albumname">{props.albumname}</div>
                </>}
                {windowSize.width >= 740 && props.isPrivate && <img className='lock' src={lockIcon} onClick={() => {
                        if (props.isSelf) setSecureModal(true)
                    }}
                />}
            </div>

            <div className="acc-info">

                {props.isSelf && !props.albumname && <div className="button label" onClick={() => setCreateAlbumModal(true)}>
                    <div className="title">Create album</div><img src={addIcon} />
                </div>}
                {props.isSelf && !!props.albumname && <div className="button label" onClick={() => setUploadImagesModal(true)}>
                    <div className="title">Upload image</div><img src={uploadIcon} />
                </div>}
                {props.isSelf && !!props.albumname && <div className="button thin" onClick={() => setEditAlbumModal(true)}><img src={settingIcon} alt="" /></div>}
                {windowSize.width < 740 && props.isPrivate &&
                    <div className="button thin" onClick={() => {if (props.isSelf) setSecureModal(true)}}>
                        <img src={lockIcon} alt="" />
                    </div>}
                {props.isSelf && !props.albumname && <div className="button thin" onClick={() => setEditUserModal(true)}><img src={settingIcon} alt="" /></div>}
                {!!props.albumname && <Copy content={CLIENT_URL + 'album/' + props.albumcode} size={30} />}
                {!!props.albumname && <div className="button thin" onClick={() => favoriteClick(props.albumcode)}>
                    <img src={favorite ? startFillIcon : starIcon} alt="" />
                </div>}
                
                {!props.albumname && <>
                <div className="info l">
                    <div className="digit">{props.albums}</div>
                    <div className="label">albums</div>
                </div>
                <div className="info r">
                    <div className="digit">{props.images}</div>
                    <div className="label">images</div>
                </div>
                </>}
                
            </div>
            </div>
        </>
        
    )
}

export default ProfilePanel