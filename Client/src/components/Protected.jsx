import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function Protected({children}) {

    const authstatus = useSelector((state)=> state.user.status)
    console.log(authstatus)

    const navigate = useNavigate()
    // const data= useSelector((state)=> state.user.userData)

    // console.log(authstatus,data)


    // if(!authstatus)
    // {
    //  navigate('/Auth')
    // return null
    // }

    useEffect(()=>{  // if we dont put in use effect it will throw error that property chnaged while rendering
      if(!authstatus)
        navigate('/Auth')
    },[authstatus,navigate]  
    )

    if(!authstatus)
      return null


  return (
    <>
     {children}
     </>
  )
}

export default Protected