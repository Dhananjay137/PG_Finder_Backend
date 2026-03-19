const userSchema = require('../models/user/User')
const propertySchema = require('../models/property/CoreProperty')

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

module.exports = {
  getDashboardStats,
}