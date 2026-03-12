const mongoose = require('mongoose')
const Schema = mongoose.Schema

const feedbackReportSchema = new Schema({
  feedbackID: {
    type: mongoose.Types.ObjectId,
    ref: "feedback",
    required: true
  },
  reporterID: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ["PENDING","RESOLVED","DISMISSED"],
    default: "PENDING"
  }
},{ timestamps: true })

module.exports = mongoose.model('feedbackReport', feedbackReportSchema)