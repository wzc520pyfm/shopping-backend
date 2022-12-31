const express = require('express')
const router = express.Router()
const ProductController = require('../controller/ProductController.js')

// 课程分类接口
router.get('/category', ProductController.category)

// 视频卡片接口
router.get('/card', ProductController.card)

// 分类查询视频接口
router.post('/query_by_cid', ProductController.query_by_cid)



module.exports = router