import React, { useContext, useEffect, useState } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { Context } from './index'
import './App.scss'
import AppRouter from './components/AppRouter'
import { check } from './http/userAPI'
import {observer} from 'mobx-react-lite'
import Navbar from './components/navbar/Navbar'
import Wrapper from './components/wrapper/Wrapper'
import Loader from './components/loader/Loader'
import Footer from './components/footer/Footer'

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, isLoading] = useState(true)

  useEffect(() => {
    check().then((data) => {
      user.setUser(data.user)
      user.setIsAuth(true)
    }).catch((e) => {
      console.log(e.response.data.message);
    }).finally(() => {
      isLoading(false)
    })
  }, [])


  if (loading) {
    return <Loader />
  }
   
  return (
    <BrowserRouter>
      <Navbar />
      <Wrapper >
        <AppRouter />
      </Wrapper>
      <Footer />
    </BrowserRouter>
  )
})

export default App;
