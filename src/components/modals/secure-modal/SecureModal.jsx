import React, { useEffect, useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../modal/Modal'
import searchIcon from '../../../assets/icons/search.svg'
import './secure-modal.scss'
import { addAccess, removeAccess, secureSearch } from '../../../http/albumAPI'

const SecureModal = ({modalActive, closeModal, name}) => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [searchBar, setSearchBar] = useState('')
    const [searchList, setSearchList] = useState([])
    const [searchMode, setSearchMode] = useState('search')
    const [activeMode, setActiveMode] = useState('search')
    const searchRef = useRef(null)

    useEffect(() => {
        if (!modalActive) return
        searchRef.current.value = ''
        if (activeMode === 'accesses') {
            secureSearch(name, '', 'accesses').then((data) => {
                setSearchList(data.users)
                setSearchMode(data.mode)
            })
        } else {
            setSearchList([])
            setSearchMode('search')
        }
    }, [activeMode, modalActive])

    const submit = () => {
        if (!searchBar.length && activeMode === 'search') {
            setSearchList([])
            return
        }
        secureSearch(name, searchBar, activeMode).then((data) => {
            setSearchList(data.users)
            setSearchMode(data.mode)
            setError('')
        }).catch((err) => {
            setError(err.response.data.message)
        })
    }

    const enterKeyPressed = (e) => {
        if (e.keyCode !== 13) return
        submit()
    }

    const add = (username) => {
        addAccess(name, username).then(() => {
            setSearchList(searchList.filter((item) => item !== username))
        }).catch((err) => {
            setError(err.response.data.message)
        })
    }
    const remove = (username) => {
        removeAccess(name, username).then(() => {
            setSearchList(searchList.filter((item) => item !== username))
        }).catch((err) => {
            setError(err.response.data.message)
        })
    }

    useEffect(() => {
        if (!!modalActive) return
        setError('')
        setSearchBar('')
        setSearchList([])
        setSearchMode('search')
        setActiveMode('search')
    }, [modalActive])

    return (
        <Modal
            button={'Search'}
            active={modalActive}
            error={error}
            closeFunc={closeModal}
            autoFocus={searchRef}
            submitFunc={submit}
            // modeFunc={activeMode !== 'accesses' ?
            //     {title: 'Remove access', styles: 'auth', func: () => {setActiveMode('accesses')}} :
            //     {title: 'Add access', styles: 'auth', func: () => {setActiveMode('search')}}}
            types={[
                { title: 'Add access', func: () => setActiveMode('search'), active: activeMode === 'search' },
                { title: 'Remove access', func: () => setActiveMode('accesses'), active: activeMode === 'accesses' },
            ]}
        >

            <div className="secure-modal">

                <div className="search-bar">
                    <input
                        ref={searchRef}
                        type='text'
                        className='input'
                        placeholder='Search...'
                        onChange={(e) => setSearchBar(e.target.value)}
                        onKeyDown={enterKeyPressed}
                    />
                    <img src={searchIcon} />
                </div>

                {modalActive && <div className="search-list">
                    {!!searchList.length && searchList.map((item, index) => {
                        return <div key={index} className="search-item">
                            <div className="name">{item}</div>
                            <div 
                                className={`button small ${searchMode === 'accesses' ? 'red' : ''}`}
                                onClick={searchMode === 'accesses' ? () => {remove(item)} : () => {add(item)}}
                            >
                                {searchMode === 'accesses' ? 'Remove access' : 'Add access'}
                            </div>
                        </div>
                    })}
                </div>}

            </div>

        </Modal>
    )
}

export default SecureModal