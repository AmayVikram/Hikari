import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import React from 'react'
import Home from './pages/Home'
import AuthPages from './pages/AuthPage'
import {Outlet} from 'react-router'
import { useSelector,useDispatch } from 'react-redux'

import jwtDecode from 'jwt-decode';
import { setAccessToken } from './features/userSlice'

function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token); // doesn't verify signature
    const currentTime = Date.now() / 1000; // in seconds

    return decoded.exp < currentTime; // true = expired
  } catch (error) {
    console.error('Invalid token', error);
    return true; // treat invalid tokens as expired
  }
}

const dispatch= useDispatch()
const accessToken = useSelector((state)=> state.user.accessToken)

useEffect(()=>{
  

  if(accessToken){
    if(isTokenExpired(accessToken)){
      axios.get('/api/refresh',{
        withCredentials:true
      }).then((res)=>{
        dispatch(setAccessToken({accessToken:res.data.accessToken}))
      }).catch((error)=>{
         console.log(error.message)
         dispatch(logout())
      })
    }
  }

  
},[])

function App() {
  const [count, setCount] = useState(0)

  

  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
