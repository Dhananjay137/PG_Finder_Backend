const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pgRoomPricingSchema = new Schema({
  propertyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'coreProperty', 
    required: true 
  },
  roomType: {
    type: String,
    enum: ["SINGLE","DOUBLE","TRIPLE","FOUR SHARING","OTHER"],
    required: true
  },

  // Financials
  monthlyRent: { type: Number, required: true, min: 0},
  depositAmount: { type: Number, required: true, min: 0},

  // Availability status for this specific sharing type
  isAvailable: { type: Boolean, default: true},

  // extra: Count of total beds vs available beds for this sharing type
  totalBeds: { type: Number, default: 1},
  availableBeds: { type: Number, default: 1},

  amenities: [{
    type: String,
    enum: ["TELEVISION", "AC_HEATING", "SINGLE_BED", "MATTRESS_PILLOW", "BLANKET", "TABLE_CHAIR", "SIDE_TABLE", "CUPBOARD", "HOT_WATER"],
    required: true
  }],

  availableFrom: { type:Date, required: true}

},{ timestamps: true })

module.exports = mongoose.model('pgRoomPricing', pgRoomPricingSchema)