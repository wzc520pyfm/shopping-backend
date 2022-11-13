/**
 * @param {*} captcha 图形验证码接口 
 * @param {*} sendCode 手机验证码接口 
 */

const NotifyService = require('../service/NotifyService')
const GetUserInfoTool = require('../utils/GetUserInfoTool')
const SecretTool = require('../utils/SecretTool')
const RandomTool = require('../utils/RandomTool')


const NotifyController = {
  captcha: (req, res) => {
    let { type } = req.query // 区分注册/登录验证码
    // 用户的 ip+设备 md5加密
    let _key = SecretTool.md5(GetUserInfoTool.getIp(req) + GetUserInfoTool.getUseragent(req)) // 为用户生成唯一标识
    let handleRes = NotifyService.captcha(_key, type)
    // 设置返回数据为图片格式
    res.set('content-type', 'image/svg+xml')
    return res.send(handleRes)
  },
  sendCode: async (req, res) => {
    // 手机号、图形验证码、请求的验证码类型（注册or登录）
    let { phone, captcha, type } = req.body
    // 用户的 ip+设备 md5加密
    let _key = SecretTool.md5(GetUserInfoTool.getIp(req) + GetUserInfoTool.getUseragent(req))
    let handleRes = await NotifyService.sendCode(phone, captcha, type, _key, RandomTool.randomCode())
    res.send(handleRes)
  }
}

module.exports = NotifyController
