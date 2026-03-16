const wishlistSchema = require('../models/interaction/Wishlist')

const createWish = async(req, res) => {
  try {
    const addedData = await wishlistSchema.create(req.body)

    res.status(201).json({
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
    const { userId } = req.query
    let query = {}

    if(userId){
      query.userId = userId
    }
    const data = await wishlistSchema.find(query)
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
  try {
    const deletedData = await wishlistSchema.findByIdAndDelete(req.params.id)

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