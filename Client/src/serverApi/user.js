import axios from 'axios'
export const userMethods = {

    login: async (userData) => {
        try {
            const res = await axios.post('/api/login', userData)
            return { success: true, userData: res.data.userData,accessToken:res.data.accessToken }
        } catch (error) {
            return { success: false, error: error.response.data.message || error.message }
        }
    },

    signUp: async (userData) => {
        try {
            const res = await axios.post('/api/signup', userData)
            return { success: true, userData: res.data,accessToken:res.data.accessToken  }
        } catch (error) {
            return { success: false, error: error.response.data.message || error.message }
        }
    },
     addtoWatchLater: async (animeData) => {
        try {
            const res = await axios.post('/api/updateWatchlater', animeData)
            // console.log(res)
            return { success: true, watchlater: res.data }
        } catch (error) {
            return { success: false, error: error.response.data.message || error.message }
        }
    },
    addToWatched: async (animeData) => {
        try {
            const res = await axios.post('/api/updateWatched', animeData)
            return { success: true, watched: res.data }
        } catch (error) {
            return { success: false, error: error.response.data.message || error.message }
        }
    },
    updateFavourites:async (animeData)=>{
        try {
            const res = await axios.post('/api/updateFavourites', animeData)
            return { success: true, watched: res.data }
        } catch (error) {
            return { success: false, error: error.response.data.message || error.message }
        }
    }
};