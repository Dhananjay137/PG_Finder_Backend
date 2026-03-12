const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nearbyAmenitySchema = new Schema({
  // FK (Core_Property) - Link to core property table
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coreProperty',
    required: true
  },
  // Category: Market, ATM, Bank, etc.
  type: {
    type: String,
    required: true
  },
  // Name of the shop/bank/station
  name: {
    type: String,
    required: true
  },
  // Latitude for Map marker
  latitude: {
    type: Number,
    required: true
  },
  // Longitude for Map marker
  longitude: {
    type: Number,
    required: true
  },
  // Google's unique identifier for the place
  googlePlaceId: {
    type: String,
    unique: true,
    required: true
  },
  // Calculated distance from the PG
  distanceKm: {
    type: Number,
    required: true
  }
}, { 
  timestamps: true // Tracks when these were added/updated
});

module.exports = mongoose.model('nearbyAmenity', nearbyAmenitySchema);