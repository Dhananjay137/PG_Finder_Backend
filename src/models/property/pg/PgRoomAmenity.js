const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pgRoomAmenity = new Schema({
  propertyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'coreProperty', 
    required: true 
  },

  // Entertainment & Climate
  television: { type: Boolean, default: false },
  acHeating: { type: Boolean, default: false },// Air conditioning or heater

  // Bedding & Comfort
  singleBed: { type: Boolean, default: false },
  mattressPillow: { type: Boolean, default: false },
  blanketQuilt: { type: Boolean, default: false },

  // Furniture
  tableChair: { type: Boolean, default: false },// Study/Work furniture
  sideTable: { type: Boolean, default: false },
  cupboard: { type: Boolean, default: false },// Storage/Almirah

  // Utilites
  hotWater: { type: Boolean, default: false },// Geyser or solar heater access
},{ timestamps: true })

module.exports = mongoose.model('pgRoomAmenity', pgRoomAmenity)