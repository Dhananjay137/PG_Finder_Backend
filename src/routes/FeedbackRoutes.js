const router = require('express').Router()
const feedbackController = require('../controllers/FeedbackController')

router.post('/feedback',feedbackController.createFeedback)
router.get('/feedbacks',feedbackController.getAllFeedback)
router.put('/feedback/:id',feedbackController.updateFeedback)
router.delete('/feedback/:id',feedbackController.deleteFeedback)

module.exports = router