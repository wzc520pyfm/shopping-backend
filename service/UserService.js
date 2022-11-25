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
      return BackCode.buildResult(CodeEnum.ACCOUNT_REPEAT)
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
  },
  forget: async (req) => {
    let { phone, password, code } = req.body
    // 判断code在redis中是否存在
    let codeExist = await redisConfig.exists('change:code:' + phone)
    if (!codeExist) return BackCode.buildError({ msg: '请先获取手机验证码' })
    // 判断redis中的code和用户code是否相等
    let codeRes = (await redisConfig.get('change:code:' + phone)).split('_')[1]
    if (!(code === codeRes)) return BackCode.buildError({ msg: '手机验证码不正确' })

    // 依据手机号更新指定用户的密码
    pwd = SecretTool.md5(password)
    await DB.Account.update({ pwd }, { where: { phone } })
    return BackCode.buildSuccessAndMsg({ msg: '修改成功' })
  },
  login: async (req) => {
    let { phone, password } = req.body
    // 参数判空
    if (!(phone && password)) return BackCode.buildError({ msg: '缺少必要参数' })
    // 判断手机号是否注册
    let userInfo = await DB.Account.findAll({ where: { phone }, raw: true })
    if (userInfo.length === 0) return BackCode.buildResult(CodeEnum.ACCOUNT_UNREGISTER)
    // 判断密码是否正确
    if (!(userInfo[0].pwd === SecretTool.md5(password))) {
      return BackCode.buildResult(CodeEnum.ACCOUNT_PWD_ERROR)
    }
    // 拼接token, 将必要的用户信息加入token, 注意除去密码
    const { pwd, ...user } = userInfo[0]
    // 生成token
    let token = SecretTool.jwtSign(user, '168h')
    return BackCode.buildSuccessAndData({ data: `Bearer ${token}` })
  }
}

module.exports = UserService