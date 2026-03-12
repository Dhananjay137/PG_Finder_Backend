const mongoose = require('mongoose')
const Schema = mongoose.Schema

const flatAmenitySchema = new Schema({
  propertyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'coreProperty', 
    required: true 
  },
  gym: { type: Boolean, default: false },
  nonVegAllowed: { type: Boolean, default: false },
  lift: { type: Boolean, default: false },
  intercom: { type: Boolean, default: false },
  swimmingPool: { type: Boolean, default: false },
  clubHouse: { type: Boolean, default: false },
  servantRoom: { type: Boolean, default: false },
  gasPipeline: { type: Boolean, default: false },
  park: { type: Boolean, default: false },
  shoppingCenter: { type: Boolean, default: false },
  freeParking: { type: Boolean, default: false },
  bathroomCount: { type: Number, required: true },
  balconyCount: { type: Number, required: true },

  //extra
  powerBackup: { type: Boolean, default: false }, // For common areas/lifts
  cctv: { type: Boolean, default: false }, // Extra layer of security
  waterSupply: { 
    type: String, 
    enum: ["CORPORATION","BOREWELL","BOTH"], 
    default: "BOTH" 
  }, // Critical for daily life
  visitorParking: { type: Boolean, default: false }, // High demand in gated societies
  fireSafety: { type: Boolean, default: false } // Essential for high-rise buildings
},{ timestamps: true })

module.exports = mongoose.model('flatAmenity', flatAmenitySchema)