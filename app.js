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

const propertyRouter = require('./src/routes/PropertyRoutes')
app.use('/property',propertyRouter)

const flatRouter = require('./src/routes/FlatRoutes')
app.use('/flat',flatRouter)

const pgRouter = require('./src/routes/PgRouter')
app.use('/pg',pgRouter)

const bookingRouter = require('./src/routes/BookingRoutes')
app.use('/booking',bookingRouter)

const bookingDocumentRouter = require('./src/routes/BookingDocumentRoutes')
app.use('/bookingDocument',bookingDocumentRouter)

const wishlistRouter = require('./src/routes/WishlistRoutes')
app.use('/wishlist',wishlistRouter)

const feedbackRouter = require('./src/routes/FeedbackRoutes')
app.use('/feedback',feedbackRouter)

const feedbackReportRouter = require('./src/routes/FeedbackReportRoutes')
app.use('/feedbackReport',feedbackReportRouter)

const PORT = process.env.PORT
app.listen(PORT,() => {
  console.log(`server started on port ${PORT}`)
})