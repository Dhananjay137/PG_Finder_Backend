const userSchema = require("../models/UserModel")

const registerUser = async (req, res) => {
  try {
    const savedUser = await userSchema.create(req.body)

    if(!savedUser) return res.status(404).json({message: "user is enable to register"})

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

module.exports = {
  registerUser,
}