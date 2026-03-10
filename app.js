const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config({debug:true})

app.use(express.json())
app.use(cors())

const DBConnection = require('./src/utils/DBConnection')
DBConnection()

const userRouter = require('./src/routes/UserRoutes')
app.use('/user',userRouter)

const PORT = process.env.PORT
app.listen(PORT,() => {
  console.log(`server started on port ${PORT}`)
})