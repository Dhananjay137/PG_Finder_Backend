//const userSchema = require("../models/UserModel")
const userSchema = require("../models/user/User")
const bcrypt = require("bcrypt")
const mailSend = require("../utils/MailUtil")
const uploadToCloudinary = require("../utils/Cloudinary")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    
    const savedUser = await userSchema.create({...req.body, password:hashedPassword})

    if(!savedUser) return res.status(404).json({message: "user is enable to register"})

  //   const logoUrl = "https://mir-s3-cdn-cf.behance.net/projects/404/8af6e4244264305.Y3JvcCwyMjA0LDE3MjQsOTIsMA.png";

  //   const htmlContent = `
  // <div style="font-family: Arial, sans-serif; text-align: center;">
  //   <!-- Use the full web URL here -->
  //   <img src="${logoUrl}" alt="PG Finder Logo" width="150" style="margin-bottom: 20px;">
    
  //   <h1 style="color: #27ae60;">Welcome to PG Finder!</h1>
  //   <p>Your registration was successful.</p>
  // </div>
  // `;


  //   await mailSend(savedUser.email,"Welcome to our app","Thank you for registering with our app.",htmlContent)
    const context={
      userName:savedUser.firstName+' '+savedUser.lastName,
      loginLink:'https://pg-finder-frontend-v8je.onrender.com/'
    }

    await mailSend(
      savedUser.email,
      'Welcome to PG Finder !',
      'welcome',
      context
    )

    res.status(201).json({
      message: "user created successfully!",
      data: savedUser
    })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while creating user",
      error: err
    })
  }
}

const loginUser = async (req, res) => {
  try {
    //console.log('req.body',req)
    const {email, password} = req.body
    const foundUserFromEmail = await userSchema.findOne({email:email})
    //console.log(foundUserFromEmail)

    if(foundUserFromEmail){

      const isPasswordMatched = await bcrypt.compare(password, foundUserFromEmail.password)

      if(isPasswordMatched){
        const token = jwt.sign(foundUserFromEmail.toObject(), process.env.JWT_SECRET, { expiresIn: 60*60*24*7 })

        res.status(200).json({
          message: "Login Success",
          //data: foundUserFromEmail,
          token: token,
          role: foundUserFromEmail.role,
          firstName: foundUserFromEmail.firstName,
          lastName : foundUserFromEmail.lastName
        })
      } else {
        res.status(401).json({
          message: "Invalid Credentials"
        })
      }

    } else {
      res.status(404).json({
        message: "user not found"
      })
    }

  } catch(err) {
    console.log(err)

    res.status(500).json({
      message: "error while logging in",
      err: err
    })
  }
}
const forgetPassword = async(req, res) => {
  try {
    const { email } = req.body

    if(!email) return res.status(400).json({message: 'email is not provided'})

    const foundUserFromEmail = await userSchema.findOne({ email: email})

    if(!foundUserFromEmail){
      return res.status(400).json({message: 'email not found!'})
    } else {
      const token = jwt.sign(foundUserFromEmail.toObject(),process.env.JWT_SECRET,{ expiresIn: 60*5})

      const url = `https://pg-finder-frontend-v8je.onrender.com/password-reset/${token}`

      await mailSend(
        foundUserFromEmail.email,
        'Password Reset',
        'password-reset',
        { resetLink: url}
      )

      res.status(200).json({
        message: `reset link has been sent to ${foundUserFromEmail.email}`
      })
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while changing password",
      error: err
    })
  }
}
const resetPassword = async(req, res) => {
  const { newPassword, token } = req.body
  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
    const hashedPassword = await bcrypt.hash(newPassword,10)

    const updatedUser = await userSchema.findByIdAndUpdate(
      decodedUser._id,
      { password: hashedPassword },
      { runValidators: true, returnDocument: 'after' }
    )

    res.status(200).json({
      message: 'password reset successfully !'
    })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: 'error while reset password',
      error: err
    })
  }
}
const getUser = async(req, res) => {
  try {
    const data = await userSchema.findById(req.user._id)
    res.status(200).json({
      message: "data fetched successfully",
      data: data
    })

  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: "error while fetching data",
      error: err
    })
  }
}
const getAllUser = async(req, res) => {
  try {
    let { role, status } = req.query
    let query = {}
    if(role){
      query.role = role.toUpperCase()
    }
    if(status){
      query.status = status.toUpperCase()
    }
    const data = await userSchema.find(query)
    res.status(200).json({
      message: "data fetched successfully",
      data: data
    })

  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: "error while fetching data",
      error: err
    })
  }
}

const updateUser = async(req, res) => {
  try {
    let data = { ...req.body }

    if(req.file){
      const cloudinaryResponse = await uploadToCloudinary(req.file.path)
      //console.log(cloudinaryResponse)
      data.profilePic = cloudinaryResponse.secure_url;
      //console.log(data)
    }
    //console.log(data)
    const updatedData = await userSchema.findByIdAndUpdate(
      req.params.id,
      data,
      { runValidators: true, returnDocument: 'after'}
    )

    const token = jwt.sign(updatedData.toObject(), process.env.JWT_SECRET, { expiresIn: 60*60*24*7 })
    
    res.status(200).json({
      message: "data updated successfully",
      token: token,
      role: updatedData.role,
      firstName: updatedData.firstName,
      lastName : updatedData.lastName
    })

  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: "error while updating data",
      error: err
    })
  }
}

const deleteUser = async(req, res) => {
  try {
    const deletedData = await userSchema.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message: "data deleted successfully",
    })

  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: "error while deleting data",
      error: err
    })
  }
}

module.exports = {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
}