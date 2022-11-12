const express = require('express')
const router = express.Router()
const NotifyController = require('../controller/NotifyController.js')

// 图形验证码接口
router.get('/captcha', NotifyController.captcha)


module.exports = router