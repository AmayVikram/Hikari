import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import React from 'react'
import Home from './pages/Home'
import AuthPages from './pages/AuthPage'
import {Outlet} from 'react-router'

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
