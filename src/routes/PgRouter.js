const router = require('express').Router()
const pgController = require('../controllers/PgController')

router.post('/pg/room',pgController.addPgRoom)
router.get('/pg/rooms/:id',pgController.getAllPgRoomsById)
router.put('/pg/room/:id',pgController.updatePgRoom)
router.delete('/pg/room/:id',pgController.updatePgRoom)

router.post('/pg',pgController.addPgDetail)
router.get('/pg/:id',pgController.getPgDetail)
router.put('/pg/:id',pgController.updatePgDetail)
router.delete('/pg/:id',pgController.deletePgDetail)

module.exports = router