import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../modal/Modal'
import { rename, remove } from '../../../http/imageAPI'
import './edit-image-modal.scss'
import { MAIN_ROUTE } from '../../../utils/consts'

const EditImageModal = ({modalActive, closeModal, imageName, albumName}) => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [newName, setNewName] = useState('')
    const inputRef = useRef(null)
    
    const submit = () => {
        if (!newName) {
            setError('Enter new image name')
            return
        }
        rename(albumName, imageName, newName).then(() => {
            navigate(MAIN_ROUTE)
        }).catch((err) => {
            setError(err.response.data.message)
        })
    }

    const enterKeyPressed = (e) => {
        if (e.keyCode !== 13) return
        submit()
    }

    const deleteFunc = () => {
        remove(imageName, albumName).then(() => {
            navigate(MAIN_ROUTE)
        }).catch((err) => {
            setError(err.response.data.message)
        })
    }

    useEffect(() => {
        if (!!modalActive) return
        setError('')
        setNewName('')
    }, [modalActive])

    return (
        <Modal
            title={'Edit image'}
            button={'Submit'}
            active={modalActive}
            autoFocus={inputRef}
            error={error}
            closeFunc={closeModal}
            submitFunc={submit}
            modeFunc={{title: 'Delete', styles: 'delete', func: deleteFunc}}
        >
            <div className="edit-image-modal">
                <div className="inputs">
                    <input
                        value={newName}
                        ref={inputRef}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={enterKeyPressed}
                        className='input'
                        type="text"
                        placeholder='New name*'
                    />
                </div>
            </div>
        </Modal>
    )
}

export default EditImageModal