const {Router} = require('express')
const authController = require('../controllers/authControllers')
const router = Router();

router.post('/login',authController.login)
router.post('/signup',authController.signup)
module.exports = router