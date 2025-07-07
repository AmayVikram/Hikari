import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store,persistor } from './app/store.js'
import AuthPages from './pages/AuthPage.jsx'
import Profile from './pages/Profile.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router'
import Home from './pages/Home.jsx'
import Protected from './components/Protected.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import Anime from './pages/Anime.jsx'
import Test from './tests/test.jsx'
import Filter from './pages/Filter.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>, // element which this will display
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"Auth",
        element:<AuthPages/>
      },
      {
        path:"profile",
        element:<Protected>
                <Profile/>
               </Protected>
      },
      {
        path:"anime/:mal_id",
        element:<Anime/>
      },
      {
      path:"filter",
      element:<Filter/>
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    {/* <Test/> */}
    <RouterProvider router={router}/>
    </PersistGate>
    </Provider>
  
)
