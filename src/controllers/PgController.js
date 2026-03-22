const pgDetailSchema = require("../models/property/pg/PgDetail")
const pgRoomPricingSchema = require("../models/property/pg/PgRoomPricing")

const addPgDetail = async(req, res) => {
  try {
    const data = await pgDetailSchema.create(req.body)

    res.status(201).json({
      message: "data created successfully",
      data: data
    })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while adding data",
      error: err
    })
  }
}
const getPgDetail = async(req, res) => {
  try {
    const data = await pgDetailSchema.findOne({ propertyId: req.params.id }).populate('propertyId')

    res.status(200).json({
      message: "data fetched successfully",
      data: data
    })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while fetching data",
      error: err
    })
  }
}
const updatePgDetail = async(req, res) => {
  try {
    const updatedData = await pgDetailSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {runValidators: true, new: true}
    )
    
    res.status(200).json({
      message: "data updated successfully",
      data: updatedData
    })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while adding data",
      error: err
    })
  }
}
const deletePgDetail = async(req, res) => {
  try {
    const deletedData = await pgDetailSchema.findByIdAndDelete(req.params.id)

    res.status(200).json({
      message: "data deleted successfully",
    })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while adding data",
      error: err
    })
  }
}

const addPgRoom = async(req, res) => {
  try {
    const addedData = await pgRoomPricingSchema.create(req.body)

    res.status(201).json({
      message: "data created successfully",
      data: addedData
    })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while adding data",
      error: err
    })
  }
}
const getAllPgRooms = async(req, res) => {
  try {
    const data = await pgRoomPricingSchema.find()
    res.status(200).json({
      message: "data found successfully",
      data: data
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while fetching data",
      error: err
    })
  }
}
const updatePgRoom = async(req, res) => {
  try {
    const updatedData = await pgRoomPricingSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, new: true}
    )

    res.status(201).json({
      message: "data updated successfully",
      data: updatedData
    })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while updating data",
      error: err
    })
  }
}
const deletePgRoom = async(req, res) => {
  try {
    const data = await pgRoomPricingSchema.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message: "data deleted successfully"
    })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while deleling data",
      error: err
    })
  }
}

module.exports = {
  addPgDetail,
  getPgDetail,
  updatePgDetail,
  deletePgDetail,
  addPgRoom,
  getAllPgRooms,
  updatePgRoom,
  deletePgRoom
}