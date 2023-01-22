import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearLogin, gethash, login, registration } from '../../../http/userAPI'
import { API_URL } from '../../../utils/consts'
import EmailSendBlock from '../../email-send-block/EmailSendBlock'
import Modal from '../modal/Modal'
import './auth-modal.scss'

const AuthModal = ({modalActive, closeModal}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')

    const [error, setError] = useState('')
    const [userLogin, setUserLogin] = useState('')
    const [emailSendActive, setEmailSendActive] = useState(false)

    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    const [activeMode, setActiveMode] = useState('register')

    const getHashes = (data) => {
        const link = API_URL + 'api/user/hash/direct?login=' + data
        const directWindow = window.open(link, '_blank')
        setUserLogin(data)
        setTimeout(() => {
            directWindow.close()
            clearLogin(data)
            navigate(0)
        }, 1000)
    }

    const modes = {
        login: {
            title: 'Authorization',
            func: () => {
                login(username, password, email, code).then((data) => {
                    getHashes(data)
                }).catch((e) => {
                    setError(e.response.data.message)
                })
            }
        },
        register: {
            title: 'Registration',
            func: () => {
                registration(username, password, email, code).then((data) => {
                    getHashes(data)
                }).catch((e) => {
                    setError(e.response.data.message)
                })
            }
        }
    }

    const enterKeyPressed = (event, field) => {
        if (event.keyCode !== 13) return
        if (field === 'username') {
            passwordRef.current.focus()
        } else if (field === 'password') {
            // modes[activeMode].func()
        }
    }

    useEffect(() => {
        setTimeout(() => {
            usernameRef.current.focus()
        }, 500);
    }, [modalActive])

    const navigate = useNavigate()

    return (
        <>
        {!!userLogin && <img src={`${API_URL}api/user/hash/elem?login=${userLogin}`}/>}
        <Modal
            title={modes[activeMode].title}
            button={'Submit'}
            active={modalActive}
            error={error}
            closeFunc={closeModal}
            submitFunc={modes[activeMode].func}
            modeFunc={activeMode === 'login' ?
                {title: 'Sign Up', styles: 'auth', func: () => {setActiveMode('register')}} :
                {title: 'Sign In', styles: 'auth', func: () => {setActiveMode('login')}}}
            >
            <div className="auth-modal">
                <div className="inputs">
                    <input ref={usernameRef}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => enterKeyPressed(e, 'username')}
                        className='input'
                        type="text"
                        placeholder='Username'
                    />
                    <input ref={passwordRef}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => enterKeyPressed(e, 'password')}
                        className='input'
                        type="password"
                        placeholder='Password'
                    />
                    {activeMode === 'login' &&
                        <div
                            className="button thin small forget"
                            onClick={() => setEmailSendActive(!emailSendActive)}
                        >
                            {emailSendActive ? 'Cancel' : 'Forget password?'}
                        </div>
                    }
                </div>

                {(activeMode === 'register' || emailSendActive) &&
                    <><div style={{marginBottom: 20}}></div> 
                    <EmailSendBlock setEmailFunc={setEmail} setCodeFunc={setCode} errorFunc={setError}/></>
                }
            </div>
            
        </Modal>
        </>
    )
}

export default AuthModal