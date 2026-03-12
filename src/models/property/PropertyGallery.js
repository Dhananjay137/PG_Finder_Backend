const mongoose = require('mongoose')
const Schema = mongoose.Schema

const propertyGallerySchema = new Schema({
  propertyID: {
    type: mongoose.Types.ObjectId,
    ref: "coreProperty",
    required: true
  },
  fileUrl: {
    type: String,
    required: true,
    trim: true
  },
  mediaType: {
    type: String,
    enum: ['PHOTO','VIDEO'],
    required: true
  },

  //bed room, main entrace, etc...
  label: {
    type: String,
    required: true
  }
},{timestamps: true})

module.exports = mongoose.model('propertyGallery', propertyGallerySchema)