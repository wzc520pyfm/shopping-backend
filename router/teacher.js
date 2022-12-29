const express = require('express')
const router = express.Router()
const TeacherController = require('../controller/TeacherController.js')

// 讲师列表接口
router.get('/list', TeacherController.list)


module.exports = router