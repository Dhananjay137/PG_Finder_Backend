const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wishlistSchema = new Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },
  propertyID: {
    type: mongoose.Types.ObjectId,
    ref: "coreProperty",
    required: true
  },
  note: {
    type: String,
    trim: true,
    default: ""
  }
},{ timestamps: true})

module.exports = mongoose.model('wishlist', wishlistSchema)