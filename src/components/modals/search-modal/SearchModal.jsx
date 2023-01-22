import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../modal/Modal'
import './search-modal.scss'
import searchIcon from '../../../assets/icons/search.svg'
import { search } from '../../../http/userAPI'
import { PROFILE_ROUTE } from '../../../utils/consts'

const SearchModal = ({modalActive, closeModal}) => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [searchBar, setSearchBar] = useState('')
    const [searchList, setSearchList] = useState([])
    const inputRef = useRef(null)

    const submit = () => {
        if (!searchBar.length) {
            setSearchList([])
            return
        }
        search(searchBar).then((data) => {
            setSearchList(data)
            setError('')
        }).catch((err) => {
            setError(err.response.data.message)
        })
    }

    const enterKeyPressed = (e) => {
        if (e.keyCode !== 13) return
        submit()
    }

    return (
        <Modal
            button={'Search'}
            active={modalActive}
            autoFocus={inputRef}
            error={error}
            closeFunc={closeModal}
            submitFunc={submit}
        >
            <div className="search-modal">
                <div className="search-bar">
                    <input
                        type="text"
                        value={searchBar}
                        ref={inputRef}
                        className="input"
                        placeholder='Search...'
                        onChange={(e) => setSearchBar(e.target.value)}
                        onKeyDown={enterKeyPressed}
                    />
                    <img src={searchIcon} />
                </div>
                
                <div className="search-list">

                    {!!searchList.length && searchList.map((item, index) => {
                        return <div 
                            key={index} 
                            className="search-item"
                            onClick={() => {
                                navigate(PROFILE_ROUTE + '/' + item)
                                closeModal()
                                setSearchBar('')
                                setSearchList([])
                            }}
                            >
                            {item}
                        </div>
                    })}
                </div>

            </div>
        </Modal>
    )
}

export default SearchModal