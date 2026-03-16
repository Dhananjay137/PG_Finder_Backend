const feedbackSchema = require('../models/interaction/Feedback')

const createFeedback = async(req, res) => {
  try {
    const createdData = await feedbackSchema.create(req.body)
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
    let { userId, propertyId } = req.query
    let query = {}

    if(userId){
      query.userId = userId
    }
    if(propertyId) {
      query.propertyId = propertyId
    }
    const data = await feedbackSchema.find(query)
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