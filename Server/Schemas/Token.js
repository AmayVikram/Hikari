import mongoose,{Schema} from "mongoose"

const tokenSchema = new Schema({
    _userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    token: {
      type: String,
      required: true
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: '7d' }
    }
})

const Token = mongoose.model('Token', tokenSchema)
export default Token