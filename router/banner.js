const express = require('express')
const router = express.Router()
const BannerController = require('../controller/BannerController.js')

// banner接口
router.get('/list', BannerController.list)


module.exports = router