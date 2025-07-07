import { createSlice } from "@reduxjs/toolkit";



const initialstate={
    status:false,
    userData:null,
    accessToken:null
}

export const userSlice = createSlice({
    name:"user",
    initialState:initialstate,
    reducers:{
        login: (state,action)=>{
            state.status = true
            state.userData = action.payload.userData
        },
        setAccessToken:(state,action)=>{
             state.accessToken= action.payload.accessToken
        },
        logout:(state,action)=>{
            state.status=false
            state.userData = null
            state.accessToken= null
        },
        updateWatched:(state,action)=>{
            state.userData.watched= action.payload.watched
        },
        updateWatchlater:(state,action)=>{
             state.userData.watchlater= action.payload.watchlater
        }

    }
})

export const  {login,logout,updateWatchlater,updateWatched,setAccessToken} = userSlice.actions

export const userReducer = userSlice.reducer