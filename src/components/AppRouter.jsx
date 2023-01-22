import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { Context } from '..'
import { adminRoutes, authRoutes, allRoutes } from '../routes'
import { MAIN_ROUTE } from '../utils/consts'

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {user.isAdmin() && adminRoutes.map(({path, Component}) => {
                return <Route key={path} path={path} element={Component}  />
            })}
            {user.isAuth &&
                authRoutes.map(({path, Component}) => {
                    return <Route key={path} path={path} element={Component} />
            })}
            {allRoutes.map(({path, Component}) => {
                return <Route key={path} path={path} element={Component} />
            })}
            
            <Route path='*' element={<Navigate replace to={MAIN_ROUTE} />} />
        </Routes>
    )
})

export default AppRouter