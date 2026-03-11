const userSchema = require("../models/UserModel")
const bcrypt = require("bcrypt")
const mailSend = require("../utils/MailUtil")

const registerUser = async (req, res) => {
  try {
    console.log("1")
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    console.log("2")
    const savedUser = await userSchema.create({...req.body, password:hashedPassword})
    console.log("3")

    if(!savedUser) return res.status(404).json({message: "user is enable to register"})

      await mailSend(savedUser.email,"Welcome to our app","Thank you for registering with our app.")

    res.status(201).json({
      message: "user created successfully!",
      data: savedUser
    })

  } catch(err) {
    res.status(500).json({
      message: "error while creating user",
      err: err
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body
    const foundUserFromEmail = await userSchema.findOne({email:email})
    console.log(foundUserFromEmail)

    if(foundUserFromEmail){

      const isPasswordMatched = await bcrypt.compare(password, foundUserFromEmail.password)

      if(isPasswordMatched){
        res.status(200).json({
          message: "Login Success",
          data: foundUserFromEmail,
          role: foundUserFromEmail.role
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
    res.status(500).json({
      message: "error while logging in",
      err: err
    })
  }
}

module.exports = {
  registerUser,
  loginUser
}