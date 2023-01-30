import React, {useRef, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { createAlbum } from '../../../http/albumAPI'
import { MAIN_ROUTE } from '../../../utils/consts'
import Modal from '../modal/Modal'
import './create-album-modal.scss'

const CreateAlbumModal = ({modalActive, closeModal}) => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const inputRef = useRef(null)

    const submit = () => {
        if (!name) {
            setError('Enter album name')
            return
        }
        createAlbum(name, isPrivate).then(() => {
            navigate(0)
        }).catch((err) => {
            setError(err.response.data.message)
        })
    }

    const enterKeyPressed = (e) => {
        if (e.keyCode !== 13) return
        submit()
    }

    useEffect(() => {
        if (!!modalActive) return
        setError('')
        setIsPrivate(false)
        setName('')
    }, [modalActive])

    return (
        <Modal
            title={'Create album'}
            button={'Submit'}
            autoFocus={inputRef}
            active={modalActive}
            error={error}
            closeFunc={closeModal}
            submitFunc={submit}
        >
            <div className="create-album-modal">

                <div className="inputs">
                    <input
                        ref={inputRef}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={enterKeyPressed}
                        className='input'
                        type="text"
                        placeholder='Name*'
                    />
                    <div className="checkbox-content">
                        <input
                            checked={isPrivate}
                            onChange={() => setIsPrivate(!isPrivate)}
                            type="checkbox"
                            className={`input checkbox ${isPrivate ? 'active' : ''}`}
                        />
                        <div className="label">private</div>
                    </div>
                    
                </div>
            </div>
        </Modal>
    )
}

export default CreateAlbumModal