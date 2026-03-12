const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingDocumentSchema = new Schema({
  bookingID: {
    type: mongoose.Types.ObjectId,
    ref: "booking",
    required: true
  },
  documentName: {
    type: String,
    enum: ["AADHAR","PAN","PASSPORT","OTHER"],
    required: true
  },
  verificationStatus: {
    type: String,
    enum: ["PENDING","VERIFIED","REJECTED"],
    default: "PENDING"
  }
}, { timestamps: true })

module.exports = mongoose.model('bookingDocument', bookingDocumentSchema)