const feedbackSchema = require('../models/interaction/Feedback')
const bookingSchema = require('../models/interaction/Booking')

const createFeedback = async(req, res) => {
  let id = req?.user?._id
  let bookingID = req?.params?.bookingID
  try {
    const createdData = await feedbackSchema.create({...req.body,userID: id})

    if(createdData){
      const bookingData = await bookingSchema.findByIdAndUpdate(
        bookingID,
        { isFeedbackGiven: true },
        { runValidators: true, returnDocument: 'after'}
      )
    }
    res.status(201).json({
      message: "data created successfully",
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
const getAllFeedback = async(req, res) => {
  try {
    let role = req?.user?.role
    let { propertyID } = req.query
    let query = {}

    if(role == 'SEEKER'){
      query.userID = req?.user?._id
    }
    if(propertyID) {
      query.propertyID = propertyID
    }
    const data = await feedbackSchema.find(query).sort({ createdAt: -1 }).populate([
      { path: 'propertyID', select: 'propertyName propertyType' },
      { path: 'userID', select: 'firstName lastName email profilePic' }
    ]);

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
}// all fedback, by usrid , by property id
const updateFeedback = async(req, res) => {
  try {
    const updatedData = await feedbackSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, returnDocument: true }
    )
    res.status(200).json({
      message: "data updated successfully",
      data: updatedData
    })

  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: "error while updating data",
      error: err
    })
  }
}
const deleteFeedback = async(req, res) => {
  try {
    const deletedData = await feedbackSchema.findByIdAndDelete(req.params.id)

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
  createFeedback,
  getAllFeedback,
  updateFeedback,
  deleteFeedback,
}