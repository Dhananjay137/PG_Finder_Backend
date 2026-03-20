const bookingDocumentSchema = require('../models/user/BookingDocument')
const uploadToCloudinary = require('../utils/Cloudinary')

const createBookingDocument = async(req, res) => {
  try {
    let data = {...req.body}
    console.log(data)

    if(req.file){
      const cloudinaryResponse = await uploadToCloudinary(req.file.path)
      console.log(cloudinaryResponse)
      data.fileUrl = cloudinaryResponse.secure_url
    }
    
    const updatedData = await bookingDocumentSchema.create(data)

    res.status(201).json({
      message: "successfully booked",
      data: updatedData
    })

  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: "error while creating data",
      error: err
    })
  }
}
const getAllBookingDocuments = async(req, res) => {
  // with query pan add kari devu
  try {
    const data = await bookingDocumentSchema.find()
    res.status(200).json({
      message: "data fetched successfully",
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
const updateBookingDocument = async(req, res) => {
  try {
    const params = req.params.id
    const updatedData = await bookingDocumentSchema.findByIdAndUpdate(
      params,
      req.body,
      { runValidators: true, returnDocument: 'after'}
    )

    res.status(201).json({
      message: "data updated successfully",
      data: updatedData
    })

  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: "error while creating data",
      error: err
    })
  }
}
const deleteBookingDocument = async(req, res) => {
  try {
    let params = req.params.id
    const deletedData = await bookingDocumentSchema.findByIdAndDelete(params)
    res.status(200).json({
      message: "data deleted successfully",
    })

  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: "error while creating data",
      error: err
    })
  }
}

module.exports = {
  createBookingDocument,
  getAllBookingDocuments,
  updateBookingDocument,
  deleteBookingDocument,
}