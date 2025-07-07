import { Schema,model } from "mongoose"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    watchlater: [{
        mal_id: Number,
        title: String,
        description: String,
        rating: Number,
        status: String,
        year: Number,
        episodes: Number,
        genre: String,
        image: String
    }],
    watched: [{
        anime: {
            mal_id: Number,
            title: String,
            description: String,
            rating: Number,
            status: String,
            year: Number,
            episodes: Number,
            genre: String,
            image: String
        },
        rating: {
            type: Number,
            min: 0,
            max: 10,
            required: true
        },
        favourite: {
            type: Boolean,
            default: false,
        }
    }]
})


const User = model("User",userSchema)

export default User
