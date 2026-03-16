const router = require('express').Router()
const pgController = require('../controllers/PgController')

router.get('/pg/rooms',pgController.getAllPgRooms)
router.post('/pg/room',pgController.addPgRoom)
router.put('/pg/room/:id',pgController.updatePgRoom)
router.delete('/pg/room/:id',pgController.updatePgRoom)

router.post('/pg',pgController.addPgDetail)
router.get('/pg/:id',pgController.getPgDetail)
router.put('/pg/:id',pgController.updatePgDetail)
router.delete('/pg/:id',pgController.deletePgDetail)

module.exports = router