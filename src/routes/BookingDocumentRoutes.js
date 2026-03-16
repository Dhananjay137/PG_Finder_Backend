const router = require('express').Router()
const bookingDocumentController = require('../controllers/BookingDocumentController')

router.post('/bookingDocument',bookingDocumentController.createBookingDocument)
router.get('/bookingDocuments',bookingDocumentController.getAllBookingDocuments)
router.put('/bookingDocument/:id',bookingDocumentController.updateBookingDocument)
router.delete('/bookingDocument/:id',bookingDocumentController.deleteBookingDocument)

module.exports = router
