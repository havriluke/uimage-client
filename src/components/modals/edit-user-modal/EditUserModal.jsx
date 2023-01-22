
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { edit } from '../../../http/userAPI'
import EmailSendBlock from '../../email-send-block/EmailSendBlock'
import Modal from '../modal/Modal'
import './edit-user-modal.scss'

const EditUserModal = ({modalActive, closeModal}) => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newCode, setNewCode] = useState('')
    const inputRef = useRef(null)
    const [emailActive, setEmailActive] = useState(false)

    const submit = () => {
        edit(password, email, code, newUsername, newPassword, newEmail, newCode).then(() => {
            navigate(0)
        }).catch((err) => {
            setError(err.response.data.message)
        })
    }

    return (
        <Modal
            title={'Edit account'}
            button={'Submit'}
            active={modalActive}
            autoFocus={inputRef}
            error={error}
            closeFunc={closeModal}
            submitFunc={submit}
        >

            <div className='edit-user-modal'>
                <div className="inputs">
                    <input
                        value={password}
                        ref={inputRef}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input'
                        type="password"
                        placeholder='Password'
                    />
                    <div
                        className="button thin small forget"
                        onClick={() => setEmailActive(!emailActive)}
                    >
                        {emailActive ? 'Cancel' : 'Forget password?'}
                    </div>
                    {emailActive &&
                        <>
                        <EmailSendBlock setEmailFunc={setEmail} setCodeFunc={setCode} errorFunc={setError}/>
                        <div style={{marginTop: 10}}></div> 
                        </>
                    }

                    
                    <input
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className='input'
                        type="text"
                        placeholder='New username'
                    />
                    <input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className='input'
                        type="password"
                        placeholder='New password'
                    />
                    <EmailSendBlock label={'New email'} setEmailFunc={setNewEmail} setCodeFunc={setNewCode} errorFunc={setError}/>
                </div>
            </div>

        </Modal>
        
    )
}

export default EditUserModal