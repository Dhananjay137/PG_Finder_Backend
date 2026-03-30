const userSchema = require('../models/user/User')
const propertySchema = require('../models/property/CoreProperty')
const bookingSchema = require('../models/interaction/Booking')
const mongoose = require('mongoose');

const getDashboardStats = async(req, res) => {
  try {

    const [
      totalProperties,
      pendingProperties,
      totalUsers,
      seekerCount,
      ownerCount,
      propertyTypeBreakdown,
      recentActivity
    ] = await Promise.all([
      propertySchema.countDocuments(),
      propertySchema.countDocuments({status: 'PENDING'}),
      userSchema.countDocuments(),
      userSchema.countDocuments({role: 'SEEKER'}),
      userSchema.countDocuments({role: 'OWNER'}),
      propertySchema.aggregate([
        { $group: { _id: "$propertyType", count: { $sum: 1 } } }
      ]),
      propertySchema.find().sort({ createdAt: -1 }).limit(5).select("propertyName createdAt")
    ])

    res.status(200).json({
      message: "data fetched successfully",
      data: {
        totalProperties,
        pendingProperties,
        users: {
          total: totalUsers,
          seekers: seekerCount,
          owners: ownerCount
        },
        chartData: propertyTypeBreakdown,
        recentActivity
      }
    })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: 'error while fetching data',
      error: err.message
    })
  }
}
const getOwnerDashboardStats = async(req, res) => {
  const user = req.user
  const ownerObjectId = new mongoose.Types.ObjectId(user?._id)
  console.log('user ID: ',user._id)
  try{
    const [
      totalProperties,
      propertyStatusBreakdown,
      propertyTypeBreakdown,
      bookingStatusBreakdown
    ] = await Promise.all([
      propertySchema.countDocuments({ ownerId: user?._id }),
      propertySchema.aggregate([
        { $match: { ownerId: ownerObjectId } },
        { $group: { _id: '$status', count: { $sum: 1} } }
      ]),
      propertySchema.aggregate([
        { $match: { ownerId: ownerObjectId } },
        { $group: { _id: '$propertyType', count: { $sum: 1 } } }
      ]),
      bookingSchema.aggregate([
        { $match: { ownerID: ownerObjectId } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ])

    res.status(200).json({
      message: 'data fetched successfully',
      data: {
        totalProperties,
        propertyStatusBreakdown,
        propertyTypeBreakdown,
        bookingStatusBreakdown,
      }
    })

  } catch(err) {
    console.log(err)
    res.status(500).json({
      message: 'error while fetching',
      error: err
    })
  }
}

module.exports = {
  getDashboardStats,
  getOwnerDashboardStats,
}