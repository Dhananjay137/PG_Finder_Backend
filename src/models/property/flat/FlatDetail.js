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
  description: {
    type: String,
    trim: true
  }
},{ timestamps: true })

module.exports = mongoose.model('flatDetail', flatDetailSchema)