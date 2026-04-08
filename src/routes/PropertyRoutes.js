const router = require('express').Router()
const propertyController = require('../controllers/PropertyController')
const validateToken = require('../middleware/AuthMiddleware')
const upload = require('../middleware/UploadMiddleware')
const geocodeAddress = require('../middleware/GeoCoderMiddlerware')

router.post('/property',upload.array('images'),geocodeAddress,propertyController.createProperty)
router.post('/nearbyAmenities',propertyController.getNearbyAmenities)
router.get('/properties',validateToken,propertyController.getAllProperty)
router.delete('/property/:id',propertyController.deleteProperty)
router.put('/property/:id',propertyController.updateProperty)

module.exports = router