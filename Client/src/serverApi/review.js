import axios from 'axios'
export const reviewMethods={


    addReview: async (reviewData)=>
    {
       try{
        const res= await axios.post('/api/review/add',reviewData)
        console.log(res)
        return {success:true,review:res.data}
       }
       catch (error){
         return {success:false, error:error.response.data.message||error.message}
       }
    },

    editReview:async (reviewData,id)=>{
        try{
            const res= axios.put(`/api/review/edit/${id}`,reviewData) 
            return {success:true,review:res.data}
        }
        catch (error){
         return {success:false, error:error.response.data.message||error.message}
       }

    },
    deleteReview:async (id)=>{
        try{
            const res= axios.put(`/api/review/delete/${id}`) 
            return {success:true,review:res.data}
        }
        catch (error){
         return {success:false, error:error.response.data.message||error.message}
       }

    },

    getReviewsofAnime: async (anime) =>{
        try
        {
        const res = await axios.get(`/api/review/get/anime/${anime}`)
        return {success:true,review:res.data}
        }
        catch (error){
         return {success:false, error:error.response.data.message||error.message}
       }
    },

    getReviewsbyUser: async (id) =>{
        try
        {
        const res = await axios.get(`/api/review/get/id/${id}`)
        return {success:true,review:res.data}
        }
        catch (error){
         return {success:false, error:error.response.data.message||error.message}
       }
    }


}