const router = require("express").Router()
const userController = require("../controllers/UserController")
const upload = require('../middleware/UploadMiddleware')

router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)
router.post('/password-forget',userController.forgetPassword)
router.put('/password-reset',userController.resetPassword)
router.get("/users",userController.getAllUser)
router.get('/user',userController.getUser)
router.put('/user/:id',upload.single('profilePic'),userController.updateUser)
router.delete('/user/:id',userController.deleteUser)

module.exports = router