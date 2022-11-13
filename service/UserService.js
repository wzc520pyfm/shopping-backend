const DB = require('../config/sequelize')
const redisConfig = require('../config/redisConfig')
const RandomTool = require('../utils/RandomTool')
const SecretTool = require('../utils/SecretTool')
const BackCode = require('../utils/BackCode')
const CodeEnum = require('../utils/CodeEnum')

const UserService = {
  register: async (phone, code) => {
    // 手机号注册查重
    let existPhone = await DB.Account.findAll({ where: { phone } })
    if (existPhone.length > 0) {
      return BackCode.buildError({ msg: '手机号已经注册' })
    }

    // 获取redis中的验证码和用户传入的验证码进行对比
    if (await redisConfig.exists('register:code:' + phone)) {
      let codeRes = (await redisConfig.get('register:code:' + phone)).split('_')[1]
      if (!(code == codeRes)) {
        return BackCode.buildError({ msg: '短信验证码不正确' })
      }
    } else {
      return BackCode.buildError({ msg: '请先获取短信验证码' })
    }

    // 随机生成头像和昵称
    let avatar = RandomTool.randomAvatar()
    let name = RandomTool.randomName()

    // 生成token 7天过期
    let user = { avatar, name, phone }
    let token = SecretTool.jwtSign(user, '168h')

    // 将用户信息插入数据库
    await DB.Account.create({ username: name, head_img: avatar, phone })
    return BackCode.buildSuccessAndData({ data: `Bearer ${token}` })
  }
}

module.exports = UserService