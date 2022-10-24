const express = require('express');
const authController = require('../controllers/authController');
const userValidation =require('../validation/userValidation');
const router = express.Router();

const userRegisterValidation = userValidation.userRegisterValidation;
const loginValidation = userValidation.loginValidation;

router.route('/signup').post(userRegisterValidation,authController.createUser);
router.route('/login').post(loginValidation,authController.loginUser);
router.route('/logout').get(authController.logOutUser);
router.route('/dashboard').get(authController.getDashboardPage);

module.exports = router;