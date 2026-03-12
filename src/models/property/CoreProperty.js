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
    enum: ["FlAT","PG"],
    required: true
  },
  propertyName: {
    type: String,
    required: true
  },
  houseNo: { type: String, trim: true },// property number
  landmarkStreet: { type: String, trim: true },
  city: { type: String, required: true, trim: true},
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  propertyContact: { type: Number, required: true },
  propertyEmail: { type: Number, required: true },

  // Updated status for Admin Approval Workflow
  status: {
    type: String,
    enum: ['PENDING','APPROVED','REJECTED','DEACTIVATED','RENT OUT'],
    default: 'PENDING' // New listings start as Pending
  },
  isVerified: {
    type: Boolean,
    default: false
  }
},{ timestamps: true })

module.exports = mongoose.model('coreProperty', corePropertySchema)