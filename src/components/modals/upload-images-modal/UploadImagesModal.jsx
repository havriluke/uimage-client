import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { add } from '../../../http/imageAPI'
import { MAIN_ROUTE } from '../../../utils/consts'
import Loader from '../../loader/Loader'
import Modal from '../modal/Modal'
import './upload-images-modal.scss'


const UploadImagesModal = ({modalActive, closeModal, name}) => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [imageFiles, setImageFiles] = useState([])
    const [isUploaded, setIsUploaded] = useState(false)

    const mostSize = useMemo(() => {
        return Math.max(...Array.from(imageFiles).map((file) => file.size))
    }, [imageFiles])
    
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })

    const submit = () => {
        if (isUploaded) return
        if (!imageFiles.length) {
            setError('Choose images')
            return
        }
        setIsUploaded(true)
        for (let index = 0; index < imageFiles.length; index++) {
            toBase64(imageFiles[index]).then((base64string) => {
                add(imageFiles[index].name, base64string, name).then(() => {
                    if (imageFiles[index].size === mostSize) {
                        navigate(MAIN_ROUTE)
                    }
                }).catch((err) => {
                    setError(err.response.data.message)
                })
            }).catch((err) => {
                setError(err.response.data.message)
            })
        }
    }

    useEffect(() => {
        if (!modalActive && !isUploaded) {
            setError('')
            setImageFiles([])
        }
    }, [modalActive])

    return (
        <Modal
            title={'Upload images'}
            button={'Upload'}
            active={modalActive}
            error={error}
            closeFunc={closeModal}
            submitFunc={submit}
            modeFunc={{title: `Files: ${imageFiles.length}`, styles: 'info', func: null}}
        >
            <div className="upload-images-modal">

                <div className="inputs">
                    <div className="file">
                        {!isUploaded && <label className='button outline' htmlFor='upload-images'>
                            Choose image
                        </label>}
                        {isUploaded && <Loader small size={35} />}
                        <input
                            type="file"
                            multiple
                            disabled={isUploaded}
                            className="input"
                            id='upload-images'
                            accept='image/*'
                            onChange={(e) => setImageFiles(e.target.files)}
                        />
                    </div>
                    
                </div>
            </div>
        </Modal>
    )
}

export default UploadImagesModal