const router = require('express').Router()
const dashboardController = require('../controllers/DashboardController')

router.get('/dashboard',dashboardController.getDashboardStats)

module.exports = router