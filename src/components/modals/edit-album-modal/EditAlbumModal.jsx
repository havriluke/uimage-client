import React, {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { rename, deleteAlbum } from '../../../http/albumAPI'
import Modal from '../modal/Modal'
import './edit-album-modal.scss'
import { MAIN_ROUTE } from '../../../utils/consts'

const EditAlbumModal = ({modalActive, closeModal, name}) => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [newName, setNewName] = useState('')
    const inputRef = useRef(null)

    const submit = () => {
        if (!newName) {
            setError('Enter new album name')
            return
        }
        rename(name, newName).then(() => {
            navigate(0)
        }).catch((err) => {
            setError(err.response.data.message)
        })
    }

    const enterKeyPressed = (e) => {
        if (e.keyCode !== 13) return
        submit()
    }

    const deleteFunc = () => {
        deleteAlbum(name).then(() => {
            navigate(MAIN_ROUTE)
        }).catch((err) => {
            setError(err.response.data.message)
        })
    }

    return (
        <Modal
            title={'Edit album'}
            button={'Submit'}
            active={modalActive}
            autoFocus={inputRef}
            error={error}
            closeFunc={closeModal}
            submitFunc={submit}
            modeFunc={{title: 'Delete', styles: 'delete', func: deleteFunc}}
        >
            <div className="edit-album-modal">
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

export default EditAlbumModal