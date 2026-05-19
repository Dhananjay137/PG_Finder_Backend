const bookingSchema = require('../models/interaction/Booking')
const pgRoomPricingSchema = require('../models/property/pg/PgRoomPricing')
const propertySchema = require('../models/property/CoreProperty')

const createBooking = async(req, res) => {
  const id = req?.user?._id
  try {
    const createdData = await bookingSchema.create({...req.body, seekerID: id})

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
    const { propertyId, status } = req.query
    const query = {}

    if(req?.user?.role === 'SEEKER'){
      query.seekerID = req?.user?._id
    }
    if(propertyId){
      query.propertyID = propertyId
    }
    if(req?.user?.role === 'OWNER'){
      query.ownerID = req?.user?._id
    }
    if(status){
      query.status = status.toUpperCase()
    }

    const data = await bookingSchema.find(query).populate([
      {path: 'propertyID', select: 'propertyName propertyType'},
      {path: 'seekerID', select: 'firstName lastName'},
      {path: 'pgRoomPricingID'},
      {
        path: 'bookingDocumentID',
        match: { verificationStatus: 'VERIFIED' }
      }
    ])
    
    const filterData = data.filter(booking => booking.bookingDocumentID !== null)

    res.status(200).json({
      message: "data fetched successfully",
      data: filterData
    })

  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: "error while fetching data",
      error: err
    })
  }
}//user id, property id

//for seeker to get detail
const getBookingDetails = async(req, res) => {
  let reqData = {
    _id: req?.params?.id,
    seekerID: req?.user?._id
  }
  try{
    const data = await bookingSchema.findOne(reqData).populate([
      {path: 'propertyID',},
      // {path: 'seekerID', select: 'firstName lastName'},
      {path: 'pgRoomPricingID'},
      {path: 'bookingDocumentID'}
    ])

    res.status(200).json({
      message: 'data fetched successfully',
      data: data
    })

  } catch(err){
    console.log(err)
    res.status(500).json({
      message: 'error while fetching',
      error: err
    })
  }
}
const updateBooking = async(req, res) => {
  try {
    let updatedRoom = null
    const updatedBooking = await bookingSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, returnDocument: 'after' }
    )

    console.log('obj booking ',updatedBooking)

    if(updatedBooking?.status == 'CONFIRMED'){
      console.log('pg room id ',updateBooking.pgRoomPricingID)

      if(updatedBooking.pgRoomPricingID){
        updatedRoom = await pgRoomPricingSchema.findByIdAndUpdate(
          updatedBooking.pgRoomPricingID,
          {
            $inc: { availableBeds: -1 }
          },
          { runValidators: true, returnDocument: 'after'}
        )
      } else {
        updatedRoom = await propertySchema.findByIdAndUpdate(
          updatedBooking.propertyID,
          { status: 'RENT_OUT'},
          { runValidators: true, returnDocument: 'after' }
        )
      }
      // auto-flip
      if (updatedRoom?.availableBeds <= 0) {
        await pgRoomPricingSchema.findByIdAndUpdate(
          updatedBooking.pgRoomPricingID,
          { isAvailable: false },
          { runValidators: true, returnDocument: 'after' }
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
  getBookingDetails,
  updateBooking,
  deleteBooking,
}