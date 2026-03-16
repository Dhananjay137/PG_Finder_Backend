const mongoose = require('mongoose')
const Schema = mongoose.Schema

const flatDetailSchema = new Schema({
  propertyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'coreProperty', 
    required: true 
  },
  // Category of building
  apartmentType: {
    type: String,
    enum: ["VILLA","HOUSE GATED SOCITY"],
    required: true
  },
  // 1BHK, 2BHK, Penthouse, etc.
  bhkType: {
    type: String,
    required: true
  },
  floorNo: { type: Number },
  totalFloors: { type: Number },
  propertyAge: { type: Number },// Age in year
  facing: { type: String },// North, East, etc..
  buildUpArea: { type: Number },// Area in Squre feet
  totalRoom: { type: Number },
  bathroomCount: { type: Number, required: true },
  balconyCount: { type: Number, required: true },

  availableFrom: {
    type: Date,
    required: true
  },

  //Financials
  maintenanceAmount: { type: Number, defalult: 0 },
  securityDeposit: { type: Number, required: true },
  expectedRent: { type: Number, required: true },
  rentNegotiable: { type: Boolean, default: false },

  //Parking Details
  parking: { type: Boolean, default: false},
  car: { type: Boolean, default: false},
  bike: { type: Boolean, default: false},

  preferredTenant: {
    type: String,
    enum: ["FAMILY","BACHELOR","ANYONE"],
    required: true
  },
  furnishingStatus: {
    type: String,
    enum: ["FULLY","SEMI","UNFURNISHED"],
    required: true
  },
  waterSupply: { 
    type: String, 
    enum: ["CORPORATION","BOREWELL","BOTH"], 
    default: "BOTH" 
  },
  amenities: {
    type: [String],
    enum:["GYM","NON_VEG_ALLOWED","LIFT","INTERCOM","SWIMMING_POOL","CLUB_HOUSE","SERVANT_ROOM","PIPED_GAS","PARK","SHOPPING_CENTER","RESERVED_PARKING","POWER_BACKUP","CCTV_SECURITY","VISITOR_PARKING", "FIRE_SAFETY"],
    required: true,
  default: [] // Good practice: start with an empty array if none selected
},

  description: {
    type: String,
    trim: true
  }
},{ timestamps: true })

module.exports = mongoose.model('flatDetail', flatDetailSchema)