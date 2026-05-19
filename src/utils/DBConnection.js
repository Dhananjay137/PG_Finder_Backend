const mongoose = require('mongoose')
const dns = require('dns')

dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])

require("dotenv").config()

const DBConnection = () => {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB connected")
  }).catch((e) => {
    console.log(e)
  })
}

module.exports = DBConnection