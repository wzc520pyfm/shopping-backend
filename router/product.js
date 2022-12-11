const express = require('express')
const router = express.Router()
const ProductController = require('../controller/ProductController.js')

// 课程分类接口
router.get('/category', ProductController.category)



module.exports = router