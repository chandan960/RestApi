const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const authenticate = require('../middleware/authenticate')

router.post('/register', userController.registerController)
router.post('/login', userController.loginController)
router.get('/', authenticate ,userController.getAllUserController)


module.exports = router