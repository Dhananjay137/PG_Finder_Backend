const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pgDetailSchema = new Schema({
  propertyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'CoreProperty', 
    required: true 
  },
  availableFor: {
    type: String,
    enum: ["BOYS","GIRLS","CO-LIVING"],
    required: true
  },
  availableFrom: {
    type: Date,
    required: true
  },
  gateClosingTime: {
    type: String,
    trim: true,
    default: "No Timing"
  },
  noticePeriodDays: {
    type: Number,
    default: 0
  },
  rentLockInMonth: {
    type: number,
    default: 0
  },
  noGuardianStay: {
    type: Boolean,
    default: false
  },

  //Food Detail
  foodIncluded: {
    type: Boolean,
    default: false
  },
  breakfast: { type: Boolean, default: false},
  lunch: { type: Boolean, default: false},
  dinner: { type: Boolean, default: false},

  //Preference
  preferredGuest: {
    type: String,
    enum: ["STUDENT","WORKING","BOTH"],
    default: "BOTH"
  },
  description: {
    type: String,
    trim: true
  }
},{ timestamps: true })

module.exports = mongoose.model('pgDetail', pgDetailSchema)