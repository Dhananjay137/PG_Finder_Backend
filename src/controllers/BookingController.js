const bookingSchema = require('../models/interaction/Booking')
const pgRoomPricingSchema = require('../models/property/pg/PgRoomPricing')

const createBooking = async(req, res) => {
  try {
    const createdData = await bookingSchema.create(req.body)

    res.status(201).json({
      message: "booking is created successfully",
      data: createdData
    })

  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: "error while creating data",
      error: err
    })
  }
}
const getAllBookings = async(req, res) => {
  try {
    const data = await bookingSchema.find()
    res.status(200).json({
      message: "data fetched successfully",
      data: data
    })

  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: "error while fetching",
      error: err
    })
  }
}
const getBookingById = async(req, res) => {
  try {
    const { userId, propertyId, status } = req.query
    const query = {}

    if(userId){
      query.userID = userId
    }
    if(propertyId){
      query.propertyID = propertyId
    }
    if(status){
      query.status = status
    }

    const data = await bookingSchema.find(query)

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
}//user id, property id
const updateBooking = async(req, res) => {
  try {
    let updatedRoom = null
    const updatedBooking = await bookingSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, new: true }
    )
    if(updatedBooking?.status == 'CONFIRMED'){
      if(updatedBooking.pgRoomPricingID){
        updatedRoom = await pgRoomPricingSchema.findByIdAndUpdate(
          updatedBooking.pgRoomPricingID,
          {
            $inc: { availableBeds: -1 }
          },
          { runValidators: true, returnDocument: 'after'}
        )
      }
      // auto-flip
      if (updatedRoom?.availableBeds <= 0) {
        await pgRoomPricingSchema.findByIdAndUpdate(
          updatedBooking.pgRoomPricingID,
          { isAvailable: false },
          {runValidators: true, returnDocument: 'after'}
        );
      }
    }
    res.status(201).json({
      message: "data updated successfully",
      data: {updatedBooking, updatedRoom}
    })

  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: "error while updating data",
      error: err
    })
  }
}
const deleteBooking = async(req, res) => {
  try {
    const deletedData = await bookingSchema.findByIdAndDelete(req.params.id)

    res.status(200).json({
      message: "data deleted successfully",
      data: deletedData
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
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
}