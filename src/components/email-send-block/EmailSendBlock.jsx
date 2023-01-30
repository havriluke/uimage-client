import React, {useState} from 'react'
import { sendEmail } from '../../http/userAPI'
import Loader from '../loader/Loader'
import './email-send-block.scss'
import doneIcon from '../../assets/icons/done.svg'

const EmailSendBlock = (props) => {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')

    const [isSending, setIsSendng] = useState(false)
    const [isSended, setIsSended] = useState(false)

    const send = () => {
        setIsSendng(true)
        sendEmail(email).catch(err => {
            props.errorFunc(err.response.data.message)
        }).finally(() => {
            setIsSendng(false)
            setIsSended(true)
            setTimeout(() => {
                setIsSended(false)
            }, 1000 * 5)
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
                {!isSending && !isSended && <div className="button outline small" onClick={send}>Send</div>}
                {isSending && !isSended && <Loader small />}
                {isSended && <div className="sended"><img src={doneIcon} /></div> }
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