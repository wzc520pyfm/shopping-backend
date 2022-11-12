const NotifyService = require('../service/NotifyService')
const GetUserInfoTool = require('../utils/GetUserInfoTool')
const SecretTool = require('../utils/SecretTool')

// 用户的 ip+设备 md5加密
const getKey = (req) => {
  return SecretTool.md5(GetUserInfoTool.getIp(req) + GetUserInfoTool.getUseragent(req))
}

const NotifyController = {
  captcha: async (req, res) => {
    let { type } = req.query // 区分注册/登录验证码
    _key = getKey(req) // 为用户生成唯一标识
    let handleRes = await NotifyService.captcha(_key, type)
    res.set('content-type', 'image/svg+xml') // 以图片形式返回
    return res.send(handleRes)
  }
}

module.exports = NotifyController
