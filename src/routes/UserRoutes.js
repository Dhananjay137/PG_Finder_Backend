const router = require("express").Router()
const userController = require("../controllers/UserController")

router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)
router.get("/users",userController.getAllUser)
router.put('/user/:id',userController.updateUser)
router.delete('/user/:id',userController.deleteUser)

module.exports = router