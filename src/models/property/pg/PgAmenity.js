const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pgAmenity = new Schema({
  propertyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'coreProperty', 
    required: true 
  },

  // Services
  laundryServices: { type: Boolean, default: false},
  roWater: { type: Boolean, default: false},
  roomCleaning: { type: Boolean, default: false},
  kitchenAccess: { type: Boolean, default: false}, //extra

  // Facilities
  powerBackup: { type: Boolean, default: false},
  lift: { type: Boolean, default: false},
  wifi: { type: Boolean, default: false},
  waterCooler: { type: Boolean, default: false},

  // Common Appliances
  fridge: { type: Boolean, default: false},
  microwave: { type: Boolean, default: false},

  // Saftey & Management
  firstAidKit: { type: Boolean, default: false},
  wardenManager: { type: Boolean, default: false},
  securityGuard: { type: Boolean, default: false},
  cctv: { type: Boolean, default: false},//extra

  // Life Style
  gym: { type: Boolean, default: false},
},{ timestamps: true })

module.exports = mongoose.model('pgAmenity', pgAmenity)