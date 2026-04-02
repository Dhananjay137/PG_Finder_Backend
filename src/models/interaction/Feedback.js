const mongoose = require('mongoose')
const Schema = mongoose.Schema

const feedbackSchema = new Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  propertyID: {
    type: mongoose.Types.ObjectId,
    ref: "coreProperty",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true,
    required: true
  },
  status: {
    type: String,
    enum: ['OK','BLOCKED'],
    default: 'OK'
  }
},{ timestamps: true })

module.exports = mongoose.model('feedback', feedbackSchema)