const feedbackReportSchema = require('../models/interaction/FeedbackReport')
const feedbackSchema = require('../models/interaction/Feedback')

const createFeedbackReport = async(req, res) => {
  let userID = req?.user?._id
  try {
    const data = feedbackReportSchema.create({...req.body, reporterID: userID})
    res.status(201).json({
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
  let role = req?.user?.role
  let query = {}

  if(role === 'SEEKER' || role === 'OWNER'){
    query.reporterID = req.user?._id
  }
  //by status or any other
  try {
    const data = await feedbackReportSchema.find(query).populate([
      {path: 'feedbackID'},
      {path: 'reporterID', select: 'firstName lastName email'}
    ])
    
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

    console.log(updatedData)
    let updateFeedback
    if(updatedData.status == 'DISMISSED'){
      updateFeedback = await feedbackSchema.findByIdAndUpdate(
        updatedData.feedbackID,
        { status: 'OK' },
        { runValidators: true, returnDocument: 'after'}
      )
    }
    if(updatedData.status == 'RESOLVED'){
      updateFeedback = await feedbackSchema.findByIdAndUpdate(
        updatedData.feedbackID,
        { status: 'BLOCKED' },
        { runValidators: true, returnDocument: 'after'}
      )
    }
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