const blogController = require('../controllers/blogController')
const {Router} = require('express')
const router = Router()
router.post("/addblog",blogController.addBlog)
module.exports = router