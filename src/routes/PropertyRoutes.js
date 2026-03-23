const router = require('express').Router()
const propertyController = require('../controllers/PropertyController')
const validateToken = require('../middleware/AuthMiddleware')
const upload = require('../middleware/UploadMiddleware')

router.post('/property',upload.array('images'),propertyController.createProperty)
router.get('/properties',validateToken,propertyController.getAllProperty)
router.delete('/property/:id',propertyController.deleteProperty)
router.put('/property/:id',propertyController.updateProperty)

module.exports = router