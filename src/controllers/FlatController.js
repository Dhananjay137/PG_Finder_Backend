const flatDetailSchema = require("../models/property/flat/FlatDetail")

const addFlatDetail = async(req, res) => {
  try {
    const addedData = await flatDetailSchema.create(req.body)

    res.status(201).json({
      message: "data added successfully",
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
const getFlatDetail = async(req, res) => {
  try {
    const data = await flatDetailSchema.findOne({ propertyId: req.params.id}).populate("propertyId")

    if(data){
      res.status(200).json({
        message: "data fetched successfully",
        data: data
      })
    }

  }catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while fetching data",
      error: err
    })
  }
}
const updateFlatDetail = async(req, res) => {
  try {
    const updatedData = await flatDetailSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {runValidators: true, new: true}
    )

    if(updatedData) {
      res.status(200).json({
        message: "data updated successfully",
        data: updatedData
      })
    }

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: "error while updating",
      error: err
    })
  }
}
const deleteFlatDetail = async(req, res) => {
  try {
    const deletedData = await flatDetailSchema.findByIdAndDelete(req.params.id)

    if(deletedData){
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
  addFlatDetail,
  getFlatDetail,
  updateFlatDetail,
  deleteFlatDetail
}