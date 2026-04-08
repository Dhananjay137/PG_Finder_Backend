const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const corePropertySchema = new Schema({
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  },
  propertyType: {
    type: String,
    enum: ["FLAT","PG"],
    required: true
  },
  propertyName: {
    type: String,
    required: true
  },
  houseNo: { type: String, trim: true },// property number
  landmarkStreet: { type: String, trim: true },
  city: { type: String, required: true, trim: true},
  address: { type: String, required: true, trim: true},
  location: {
    type: {
      type: String,
      enum: ['Point'], // Must be 'Point'
      default: 'Point'
    },
    coordinates: {
      type: [Number], // Array of numbers: [Longitude, Latitude]
      required: true
    }
  },
  propertyContact: { type: Number, required: true },
  propertyEmail: { type: String, required: true },

  // gallery
  gallery: [{
    fileUrl: { type: String, required: true, trim: true },
    mediaType: { type: String, enum: ['PHOTO', 'VIDEO'], required: true },
    label: { type: String, required: true }
  }],

  // vist schedule
  visitSchedule: {
    dayType: {
      type: String,
      enum: ["EVERYDAY", "WEEKDAYS", "WEEKENDS"],
      required: true
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    allDayAccess: { type: Boolean, default: false }
  },

  // Updated status for Admin Approval Workflow
  status: {
    type: String,
    enum: ['PENDING','APPROVED','REJECTED','DEACTIVATED','RENT_OUT','BLOCKED'],
    default: 'PENDING' // New listings start as Pending
  },
  isVerified: {
    type: Boolean,
    default: false
  }
},{ timestamps: true })

module.exports = mongoose.model('coreProperty', corePropertySchema)