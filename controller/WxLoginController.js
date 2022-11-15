/**
 * @param wechat_insert 验证微信接入
 * @param login 获取二维码接口
 * @param wechat_message 用户扫码事件
 * @param check_scan 轮询是否扫码
 */
const WxLoginService = require('../service/WxLoginService')
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
  },
  wechat_message: async (req, res) => {
    let handleRes = await WxLoginService.wechat_message(req)
    res.send(handleRes)
  },
  check_scan: async (req, res) => {
    let handleRes = await WxLoginService.check_scan(req)
    res.send(handleRes)
  }
}

module.exports = WxLoginController
