const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName:{
    type: String,
    required: true
  },
  middleName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  contact:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  role:{
    type: String,
    default: "seeker",
    enum: ["seeker","owner","admin"]
  },
  lookingForPartner:{
    type: Boolean,
    default: false
  },
  profilePic:{
    type: String,
    default: ""
  },
  status:{
    type: String,
    enum:["active","inactive","deleted","blocked"]
  },
  
})
module.exports = mongoose.model('users',userSchema)