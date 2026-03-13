const mongoose = require('mongoose')
const Schema = mongoose.Schema

const visitScheduleSchema = new Schema({
  propertyID: {
    type: mongoose.Types.ObjectId,
    ref: "coreProperty",
    required: true
  },
  dayType: {
    type: String,
    enum: ["EVERYDAY","WEEKDAYS","WEEKENDS"],
    required: true
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },

  // BOOLEAN: If True, ignore specific times
  allDayAccess: {
    type: Boolean,
    default: false
  }
},{ timestamps: true })

module.exports = mongoose.model('visitSchedule', visitScheduleSchema)