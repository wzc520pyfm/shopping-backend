const NotifyService = require('../service/NotifyService')

const NotifyController = {
  captcha: async (req, res) => {
    let handleRes = await NotifyService.captcha()
    res.set('content-type', 'image/svg+xml') // 以图片形式返回
    return res.send(handleRes)
  }
}

module.exports = NotifyController
