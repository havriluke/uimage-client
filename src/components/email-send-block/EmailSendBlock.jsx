import React, {useState} from 'react'
import { sendEmail } from '../../http/userAPI'
import './email-send-block.scss'

const EmailSendBlock = (props) => {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')

    const [isSending, setIsSendng] = useState(false)

    const send = () => {
        setIsSendng(true)
        sendEmail(email).catch(err => {
            props.errorFunc(err.response.data.message)
        }).finally(() => {
            setIsSendng(false)
        })
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
        props.setEmailFunc(e.target.value)
    }
    const changeCode = (e) => {
        setCode(e.target.value)
        props.setCodeFunc(e.target.value)
    }

    return (
        <div className='email-send-block'>
            <div className="email-field">
                <input
                    value={email}
                    onChange={changeEmail}
                    type="email"
                    className="input"
                    placeholder={props.label || 'Email'}
                />
                {!isSending && <div className="button outline small" onClick={send}>Send</div>}
                {isSending && <div className="button outline small">Sending...</div>}
            </div>
            <div className="code-field">
                <input
                    value={code}
                    onChange={changeCode}
                    type="text"
                    className="input"
                    placeholder='Code'
                />
            </div>
        </div>
    )
}

export default EmailSendBlock