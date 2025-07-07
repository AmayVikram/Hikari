import mongoose from "mongoose";
import User from "../Schemas/User.js";
import bcrpyt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Token from "../Schemas/Token.js";
dotenv.config()


const generatenewTokens= async (userid) =>{
    const access_token= jwt.sign({userid:userid},process.env.ACCESS_SECRET,{expiresIn:'15m'})
    const refresh_token= jwt.sign({userid:userid},process.env.REFRESH_SECRET)

    try {
         await Token.findOneAndUpdate({_userId:userid},{$set:{_userId:userid,token:refresh_token,expireAt:Date.now()}},{upsert:true})
        // console.log(result)
        // console.log(`refresh token is ${refresh_token}`,`access_token is ${access_token}`)

        return {refresh_token:refresh_token,access_token,access_token}
    }
    catch(error){
        console.log(error)
    }

            
}


const userControllers = {

    // Login controller
    login: async (req, res) => {

        // console.log(req.body)
        const { userInput, password } = req.body;

        try {
            const user = await User.findOne({ $or: [{ username: userInput }, { email: userInput }] });

            if (!user) // null won't trigger catch
                return res.status(404).json({ message: "User Not Found" });

           

            if (!await bcrpyt.compare(password,user.password))
                return res.status(401).json({ message: "Email Or password is incorrect" });

            console.log(user)
            // const { password, ...userData } = user; // userData is now an object that has all properties except password (preferred but is causing issues)
            const userData = {
                id: user._id,
                username: user.username,
                email: user.email,
                watched: user.watched,
                watchlater: user.watchlater
            };

           

    

            // console.log(userData)

            // console.log(access_token,refresh_token)

            const {refresh_token,access_token}= await generatenewTokens(user._id)

             res.cookie('refreshToken', refresh_token, {
  httpOnly: true,       // JavaScript can't access it
  secure: true,         // Only over HTTPS (disable for localhost if needed)
  sameSite: 'Strict',   // Prevent CSRF (or 'Lax' or 'None' with secure)
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });


            return res.status(200).json({userData:userData,access_token:access_token});
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "internal server error" });
        }
    },

    // Signup controller
    signUp: async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

            if (user)
                return res.status(409).json({ message: "user already exists" });

            const hashedPassword = await bcrpyt.hash(password,8)

            const newUser = new User({
                username,
                email,
                password:hashedPassword
            });

            await newUser.save();

            const userData = {
                id: newUser._id,
                username,
                email,
                watched: newUser.watched,
                watchlater: newUser.watchlater
            };

            
            const {refresh_token,access_token}= await generatenewTokens(newUser._id)

            res.cookie('refreshToken', refresh_token, {
  httpOnly: true,       // JavaScript can't access it
  secure: true,         // Only over HTTPS (disable for localhost if needed)
  sameSite: 'Strict',   // Prevent CSRF (or 'Lax' or 'None' with secure)
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});



            // console.log(`refresh token is ${refresh_token}`,`access_token is ${access_token}`)


            return res.status(200).json({userData:userData,access_token:access_token});
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "internal server error" });
        }
    },

    // Update watch later controller
    updateWatchLater: async (req, res) => {
        const { id, anime } = req.body;

        try {
            const user = await User.findById(id);

            if (!user)
                return res.status(404).json({ message: "User Not Found" });

            if(!user.watchlater.find((watchedanime)=> watchedanime.mal_id===anime.mal_id))
                user.watchlater.push(anime)

            await user.save()

            console.log(user.watchlater)

            return res.status(200).json(user.watchlater);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({message:"internal server error"});
        }
    },

    // Update favourites controller
    updateFavourites: async (req, res) => {
        const { id, anime} = req.body;

        try {
            const user = await User.findById(id);

            if (!user)
                return res.status(404).json({ message: "User Not Found" });

            const watchedanime= user.watched.find((animeWatched)=> animeWatched.anime.mal_id===anime.mal_id)

            if(!watchedanime)
                return res.status(404).json({ message: "Anime Not Found" });

            watchedanime.favourite= !watchedanime.favourite

            console.log(watchedanime)

            await user.save()

            return res.status(200).json(user.watched);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({message:"internal server error"});
        }
    },
    updateWatched: async (req,res)=>{
        const { id,anime} = req.body;

        const rating =Number(req.body.rating)

        

        try {
            const user = await User.findById(id);

            if (!user)
                return res.status(404).json({ message: "User Not Found" });

            if(user.watched.find((watchedanime)=> watchedanime.anime.mal_id===anime.mal_id))
                return res.status(400).json({message:"Already Watched"})

            user.watched.push({anime,rating})

            await user.save()

            return res.status(200).json(user.watched);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({message:"internal server error"});
        }
    },
    refreshToken:async (req,res)=>{
        const token = req.cookies.accessToken 

        try{
        const decoded= jwt.verify(token,process.env.REFRESH_SECRET)

        const userid= decoded.userid


        
        const checkToken= Token.find({_userId:userid})

        if(checkToken)
        {
            const accessToken= jwt.sign({userid:userid},process.env.ACCESS_SECRET,{expiresIn:'15m'})
            return res.status(200).json({accessToken:accessToken})
        }

        return res.status(401).json({message:"Unauthorized Request "})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal Server error"})
    }
        

    }

    
};

export default userControllers;
