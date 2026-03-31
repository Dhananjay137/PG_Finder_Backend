const wishlistSchema = require('../models/interaction/Wishlist')

const createWish = async(req, res) => {
  try {
    let data = { ...req?.body, userID: req?.user?._id}

    const exist = await wishlistSchema.findOne({
      userID: req?.user?._id,
      propertyID: req?.body?.propertyID
    })
    if(exist){
      return res.status(200).json({
        exists: true,
        message: 'Property is already in your wishlist',
        data: exist
      })
    }

    const addedData = await wishlistSchema.create(data)

    res.status(201).json({
      exists: false,
      message: "data added successfully",
      data: addedData
    })

  } catch(err) {
    console.error(err)
    res.status(500).json({
      message: "error while adding body",
      error: err
    })
  }
}
const getAllWish = async(req, res) => {
  try {
    let id = req.user?._id
    const data = await wishlistSchema.find({userID: id}).populate('propertyID')
    //console.log(data)

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
const updateWish = async(req, res) => {
  try {
    const updatedData = await wishlistSchema.findByIdAndUpdate(
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
const deleteWish = async(req, res) => {
  let data = {
    userID: req?.user?._id,
    _id: req?.params?.id
  }
  try {
    const deletedData = await wishlistSchema.findOneAndDelete(data)

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
  createWish,
  getAllWish,
  updateWish,
  deleteWish,
}