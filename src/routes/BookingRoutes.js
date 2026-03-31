const router = require('express').Router()
const bookingController = require('../controllers/BookingController')

router.post('/booking',bookingController.createBooking)
router.get('/bookings',bookingController.getAllBookings)
router.get('/booking',bookingController.getBookingById)
router.get('/details/:id',bookingController.getBookingDetails)
router.put('/booking/:id',bookingController.updateBooking)
router.delete('/booking/:id',bookingController.deleteBooking)
module.exports = router