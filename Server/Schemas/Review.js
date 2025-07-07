import mongoose, {Schema} from 'mongoose'

const reviewSchema = new Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    anime:{
       type:String,
       required:true
    },
    username:{
      type:String,
      required:true,
    },
    title:{
       type:String,
       required:true
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:10
    },
    status:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

const Review = mongoose.model('Review',reviewSchema)

export default Review