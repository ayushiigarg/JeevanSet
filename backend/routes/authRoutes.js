const express = require('express')
const { registerController, loginController } = require('../controllers/authController');
const validateUserAddress = require('../middlewares/validateAddress');
const router = express.Router()
//Register
router.post('/register', validateUserAddress, registerController); // Apply the address validation middleware here
//Login

module.exports = router