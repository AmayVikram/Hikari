import express, { urlencoded } from 'express'
import mongoose from 'mongoose';
import authRouter from './user/userRoutes.js'
import reviewRouter from './review/reviewRoutes.js';
import dotenv from 'dotenv'

dotenv.config()


// console.log(authRouter)


const app = express();
app.use(express.json());
app.use(urlencoded({extended:false})) // these two help expresss deal with json data (second one helps parse url encoded data)

app.use('/api',authRouter)
app.use('/api/review',reviewRouter)


mongoose.connect(process.env.MONGO_DB_URL).then(()=>console.log("mongoDB connected")).catch((e)=>console.log(e.message))

app.listen(5000,()=>{
    console.log("LocalHost listening on port 5000")
})