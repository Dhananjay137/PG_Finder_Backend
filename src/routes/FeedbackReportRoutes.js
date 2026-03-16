const router = require('express').Router()
const feedbackReportController = require('../controllers/FeedbackReportContoller')

router.post('/feedbackReport',feedbackReportController.createFeedbackReport)
router.get('/feedbackReports',feedbackReportController.getAllFeedbackReports)
router.put('/feedbackReport/:id',feedbackReportController.updateFeedbackReport)
router.delete('/feedbackReport/:id',feedbackReportController.deleteFeedbackReport)

module.exports = router