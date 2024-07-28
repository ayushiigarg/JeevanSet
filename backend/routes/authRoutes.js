const express = require('express')
const { registerController, loginController, currentUserController } = require('../controllers/authController');
const validateUserAddress = require('../middlewares/validateAddress');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router()
//Register||Post
router.post('/register', validateUserAddress, registerController); // Apply the address validation middleware here
//Login||Post
router.post('/login',loginController)

//GET CURRENT USER || GET
router.get('/current-user',authMiddleware,currentUserController)

module.exports = router