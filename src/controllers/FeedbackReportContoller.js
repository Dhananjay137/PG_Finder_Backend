const feedbackReportSchema = require('../models/interaction/FeedbackReport')

const createFeedbackReport = async(req, res) => {
  try {
    const data = feedbackReportSchema.create(req.body)
    res.status(200).json({
      message: "data created successfully",
      data: data
    })
  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: "error while creating data",
      error: err
    })
  }
}
const getAllFeedbackReports = async(req, res) => {
  //by status or any other
  try {
    const data = await feedbackReportSchema.find()
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
}
const updateFeedbackReport = async(req, res) => {
  try {
    const updatedData = await feedbackReportSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, returnDocument: 'after'}
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
const deleteFeedbackReport = async(req, res) => {
  try {
    const deletedData = await feedbackReportSchema.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message: "data deleted successfully"
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
  createFeedbackReport,
  getAllFeedbackReports,
  updateFeedbackReport,
  deleteFeedbackReport,
}