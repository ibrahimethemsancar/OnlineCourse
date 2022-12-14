const express = require('express');
const pageController = require('../controllers/pageController');
const userController = require('../controllers/authController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');
const router = express.Router();


router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);

module.exports = router;