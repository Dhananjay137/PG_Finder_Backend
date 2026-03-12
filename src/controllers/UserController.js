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

    const logoUrl = "https://mir-s3-cdn-cf.behance.net/projects/404/8af6e4244264305.Y3JvcCwyMjA0LDE3MjQsOTIsMA.png";

const htmlContent = `
  <div style="font-family: Arial, sans-serif; text-align: center;">
    <!-- Use the full web URL here -->
    <img src="${logoUrl}" alt="PG Finder Logo" width="150" style="margin-bottom: 20px;">
    
    <h1 style="color: #27ae60;">Welcome to PG Finder!</h1>
    <p>Your registration was successful.</p>
  </div>
`;


    await mailSend(savedUser.email,"Welcome to our app","Thank you for registering with our app.",htmlContent)

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