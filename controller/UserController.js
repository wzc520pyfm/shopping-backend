/**
 * @params register 注册接口
 * @params forget 设置密码接口
 * @params login 登录接口
 * @params detail 用户信息接口
 */

const UserService = require('../service/UserService.js')

const UserController = {
  register: async (req, res) => {
    let { phone, code } = req.body
    let handleRes = await UserService.register(phone, code)
    res.send(handleRes)
  },
  forget: async (req, res) => {
    let handleRes = await UserService.forget(req)
    res.send(handleRes)
  },
  login: async (req, res) => {
    let handleRes = await UserService.login(req)
    res.send(handleRes)
  },
  detail: async (req, res) => {
    let handleRes = await UserService.detail(req)
    res.send(handleRes)
  }
}

module.exports = UserController