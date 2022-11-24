const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController.js')

// 注册接口
router.post('/register', UserController.register)

// 设置密码接口
router.post('/forget', UserController.forget)


module.exports = router