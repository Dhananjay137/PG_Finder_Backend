const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
  seekerID: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  ownerID: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  propertyID: {
    type: mongoose.Types.ObjectId,
    ref: "coreProperty",
    required: true
  },
  bookingDocumentID:{
    type: mongoose.Types.ObjectId,
    ref: "bookingDocument",
    required: true
  },
  
  // extra
  pgRoomPricingID: {
    type: mongoose.Types.ObjectId,
    ref: "pgRoomPricing"
  },
  bookingAmount: {
    type: Number,
    required: true
  },

  bookingDate: { type: Date, default: Date.now },

  // extra
  expectedCheckInDate: { 
    type: Date, 
    required: true 
  },

  status: {
    type: String,
    enum: ["PENDING","CONFIRMED","CANCELLED","REJECTED","COMPLETED"],
    default: "PENDING"
  },

},{ timestamps: true })

module.exports = mongoose.model('booking', bookingSchema)