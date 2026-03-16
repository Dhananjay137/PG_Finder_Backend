const router = require("express").Router()
const flatController = require("../controllers/FlatController")

router.post("/flat",flatController.addFlatDetail)
router.get("/flat/:id",flatController.getFlatDetail)
router.put("/flat/:id",flatController.updateFlatDetail)
router.delete("/flat/:id",flatController.deleteFlatDetail)

module.exports = router