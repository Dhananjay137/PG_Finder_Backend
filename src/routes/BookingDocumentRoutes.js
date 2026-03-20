const router = require('express').Router()
const bookingDocumentController = require('../controllers/BookingDocumentController')
const upload = require('../middleware/UploadMiddleware')

router.post('/bookingDocument',upload.single('fileUrl'),bookingDocumentController.createBookingDocument)
router.get('/bookingDocuments',bookingDocumentController.getAllBookingDocuments)
router.put('/bookingDocument/:id',bookingDocumentController.updateBookingDocument)
router.delete('/bookingDocument/:id',bookingDocumentController.deleteBookingDocument)

module.exports = router
