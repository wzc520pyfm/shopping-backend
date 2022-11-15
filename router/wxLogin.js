const express = require('express')
const router = express.Router()
const WxLoginController = require('../controller/WxLoginController.js')

// 微信验证接入接口
router.get('/callback', WxLoginController.wechat_insert)
// 获取二维码接口
router.get('/login', WxLoginController.login)
// (用户扫码后)微信回调发送用户信息接口
router.post('/callback', WxLoginController.wechat_message)
// 轮询用户是否扫码
router.get('/check_scan', WxLoginController.check_scan)


module.exports = router