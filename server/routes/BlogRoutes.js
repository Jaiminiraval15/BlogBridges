const blogController = require('../controllers/blogController')
const {Router} = require('express')
const router = Router()
router.get('/',blogController.getAll)
router.post("/addblog",blogController.addBlog)
router.delete("/deleteblog/:blogid",blogController.deleteBlog)
router.put("/editblog/:blogid",blogController.editBlog)
module.exports = router