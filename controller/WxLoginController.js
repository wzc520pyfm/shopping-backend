const WxLoginService = require('../service/WxLoginService')
/**
 * @param wechat_insert 验证微信接入
 */
const WxLoginController = {
  wechat_insert: (req, res) => {
    // 从微信服务器拿对称加密的参数
    // see: https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html
    let { signature, timestamp, nonce, echostr } = req.query
    let handleRes = WxLoginService.wechat_insert(signature, timestamp, nonce, echostr)
    res.send(handleRes)
  },
  login: async (req, res) => {
    let handleRes = await WxLoginService.login()
    res.send(handleRes)
  }
}

module.exports = WxLoginController
