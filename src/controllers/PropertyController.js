const { default: mongoose } = require("mongoose")
const corePropertySchema = require("../models/property/CoreProperty")
const nearbyAmenity = require("../models/property/NearbyAmenity")
const uploadToCloudinary = require('../utils/Cloudinary')

const createProperty = async(req, res) => {

  try {
    let cloundinaryResponse = []
    let data = {...req?.body}
    //  console.log(req?.body)
    //  console.log(req?.files)

    if(req?.files){
      cloundinaryResponse = await Promise.all(
        req.files.map((file ) => uploadToCloudinary(file.path))
      )
    }
    const updatedGallery = [data.gallery].flat().map((imgString,i)=> {
      //console.log(imgString)
      let imgObj = JSON.parse(imgString)
      imgObj.fileUrl = cloundinaryResponse[i].secure_url
      return imgObj
    })

    //console.log(updatedGallery)
    data.gallery = updatedGallery
    data.visitSchedule = JSON.parse(req?.body?.visitSchedule)

    //console.log(data)


    const savedProperty = await corePropertySchema.create(data)
    const propertyID = savedProperty._id

    // await nearbyAmenity.create({...amenities, propertyID})

    res.status(201).json({
      message: "property added successfully",
      data: savedProperty
    })

  } catch(err) {
    console.log(err)

    res.status(500).json({
      message: "error while adding data",
      error: err
    })
  }
}

// simple get & filter get: city, type, status
const getAllProperty = async(req, res) => {
  try {
    const { id, status, type, city, page = 1, limit=10 } = req.query

    const query = {}

    if(status) {
      query.status = status.toUpperCase()
    }
    if(type) {
      query.propertyType = type.toUpperCase()
    }
    if(city) {
      query.city = { $regex: city, $options: 'i'}
    }
    if(id){
      query.ownerId = id
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const properties = await corePropertySchema.find(query)
    .skip(skip)
    .limit(parseInt(limit))

    const totalCount = await corePropertySchema.countDocuments(query)

    res.status(200).json({
      message: "data fetched successfully",
      totalCount: totalCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
      data: properties
    })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while fetching data",
      error: err
    })
  }
}

const updateProperty = async(req, res) => {
  try {
    let data = {...req?.body}
    if(req?.body?.status == 'APPROVED'){
      data.isVerified = true
    }
    if(req?.body?.status == 'PENDING'){
      data.isVerified = false
    }
    const updatedData = await corePropertySchema.findByIdAndUpdate(
      req.params.id,
      data,
      {runValidators: true, returnDocument: 'after'}
    )

    if(updatedData){
      res.status(201).json({
        message: "data updated successfully",
        data: updatedData
      })
    }

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while updating data",
      error: err
    })
  }
}

const deleteProperty = async(req, res) => {
  try {
    const deletedProperty = await corePropertySchema.findByIdAndDelete(req.params.id)

    if(deletedProperty){
      res.status(200).json({
        message: "data deleted successfully"
      })
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while deleting data",
      error: err
    })
  }
}

module.exports = {
  createProperty,
  getAllProperty,
  updateProperty,
  deleteProperty,
}