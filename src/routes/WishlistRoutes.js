const router = require('express').Router()
const wishlistController = require('../controllers/WishlistController')

router.post('/wish',wishlistController.createWish)
router.get('/wishes',wishlistController.getAllWish)
router.put('/wish/:id',wishlistController.updateWish)
router.delete('/wish/:id',wishlistController.deleteWish)

module.exports = router
