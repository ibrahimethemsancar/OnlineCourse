const express = require('express');
const authController = require('../controllers/authController');
const userValidation =require('../validation/userValidation');
const router = express.Router();

router.route('/signup').post(userValidation,authController.createUser);

module.exports = router;