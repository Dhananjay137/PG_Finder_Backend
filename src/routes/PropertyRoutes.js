const router = require('express').Router()
const propertyController = require('../controllers/PropertyController')

router.post('/property',propertyController.createProperty)
router.get('/properties',propertyController.getAllProperty)
router.delete('/property/:id',propertyController.deleteProperty)
router.put('/property/:id',propertyController.updateProperty)

module.exports = router