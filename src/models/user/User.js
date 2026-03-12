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
    unique: true,
    lowercase: true,
    trim: true
  },
  contact:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true,
    trim: true
  },
  role:{
    type: String,
    enum: ["SEEKER","OWNER","ADMIN"],
    default: "SEEKER"
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
    enum:["ACTIVE","INACTIVE","DELETED","BLOCKED"],
    default: "INACTIVE"
  },
},{timestamps: true})

module.exports = mongoose.model('user',userSchema)