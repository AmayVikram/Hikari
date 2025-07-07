import { createSlice } from "@reduxjs/toolkit";



const initialstate={
    status:false,
    userData:null
}

export const userSlice = createSlice({
    name:"user",
    initialState:initialstate,
    reducers:{
        login: (state,action)=>{
            state.status = true
            state.userData = action.payload.userData
        },
        logout:(state,action)=>{
            state.status=false
            state.userData = null
        },
        updateWatched:(state,action)=>{
            state.userData.watched= action.payload.watched
        },
        updateWatchlater:(state,action)=>{
             state.userData.watchlater= action.payload.watchlater
        }

    }
})

export const  {login,logout,updateWatchlater,updateWatched} = userSlice.actions

export const userReducer = userSlice.reducer