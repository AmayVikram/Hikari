import { get } from "mongoose";
import Review from "../Schemas/Review.js";

const reviewController ={

    addReview: async (req,res)=>{
        const {id,anime,rating,content,title,status,username}= req.body

    

        try{
            const review = await Review.findOne({$and:[{userid:id},{anime:anime}]})

            if(review)
            {
                return res.status(409).json({message:"Already Reviewed"})
            }

            const userRating =Number(rating)

            if(isNaN(userRating) || userRating>10 || userRating <0)
            {
              return res.status(400).json({message:"Invalid rating"})
            }
            

            const newReview = new Review({
                userid:id,
                username,
                anime,
                rating:userRating,
                title,
                status,
                content
            })

            // console.log(newReview)

            await newReview.save()

            return res.status(200).json(newReview)
        }
        catch(error)
        {
            console.log(error)
            return res.status(500).json({ message: "internal server error" });
        }
    },

    deleteReview: async (req,res)=>{
        const {id}= req.params

        try{
            const review = await Review.findById(id)
            if(!review)
               return res.status(404).json({message:"Review Not Found"})
            
            await Review.deleteOne({_id:id})

            // or use findoneanddelete

            return res.status(200).json({message:"Review Deletion successful"})

            
        }
        catch(error){
            console.log(error)
            return res.status(500).json({ message: "internal server error" });
        }

    },

    updateReview:async(req,res)=>{
      const {id}= req.params;
      const {userid,anime,rating,content,title,status,username}= req.body

      console.log(req.body)

      const updateData = {anime,rating,content,title,status,username}
      
      if(userid)
      updateData.userid = userid

      const review= await Review.findByIdAndUpdate(id,updateData,{new:true}) // return after updation
    
       if(!review)
       {
        return res.status(404).json({message:"Review Not Found"})
       }



       await review.save()
       
       return res.status(200).json({message:"Review Updation successful"})

       
    },

    getReviewsofAnime:async (req,res)=>{
            const {anime}= req.params

        try{
            const reviews = await Review.find({anime:anime}).select('-userid')

            console.log(reviews)
            

            return res.status(200).json(reviews)

            
        }
        catch(error){
            console.log(error)
            return res.status(500).json({ message: "internal server error" });
        }
        },



        getReviewsbyUser:async (req,res)=>{
            const {id}= req.params

        try{
            const reviews = await Review.find({userid:id})
            

            return res.status(200).json(reviews)

            
        }
        catch(error){
            console.log(error)
            return res.status(500).json({ message: "internal server error" });
        }
        }
            
        
    }

    




export default reviewController