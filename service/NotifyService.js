const svgCaptcha = require('svg-captcha')
const redisConfig = require('../config/redisConfig')
const aliyunMessage = require('../config/aliyunMessage')
const dayjs = require('dayjs')
const BackCode = require('../utils/BackCode')
const CodeEnum = require('../utils/CodeEnum')

const NotifyService = {
  /**
   * @param {string} key 用户唯一标识
   * @param {enum['register', 'login']} type 验证码类别
   * @returns 
   */
  captcha: (key, type) => {
    let captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 1, //干扰线
      background: '#bbb', // 背景颜色
      color: '#fff',
      height: 60,
      fontSize: 75
    })
    redisConfig.set(`${type}:captcha:` + key, captcha.text, 600) // 将生成的验证码存入redis, 过期时间为10分钟

    return captcha.data // 返回完整的验证码信息
  },
  sendCode: async (phone, captcha, type, key, randomCode) => {
    // *****************************方案1***********************
    // // 60秒内不能重复获取
    // if (await redisConfig.exists(`${type}:over:` + phone)) {
    //   return BackCode.buildResult(CodeEnum.CODE_LIMITED)
    // }
    // *****************************方案2***********************
    if (await redisConfig.exists(`${type}:code:` + phone)) {
      let dateRedis = dayjs(Number((await redisConfig.get(`${type}:code:` + phone)).split('_')[0]))
      if (dayjs(Date.now()).diff(dateRedis, 'second') <= 60) { // 距离短信发送未超过60秒不可重复发送
        return BackCode.buildResult(CodeEnum.CODE_LIMITED)
      }
    }

    // 是否有图形验证码
    if (!(await redisConfig.exists(`${type}:captcha:` + key))) {
      return BackCode.buildResult(CodeEnum.CODE_SEND)
    }
    if (!captcha) {
      return BackCode.buildError({ msg: '缺少captcha参数' })
    }

    // 对比用户的图形验证码和redis储存的是否一致
    let captchaRedis = await redisConfig.get(`${type}:captcha:` + key)
    if (!(String(captcha).toLowerCase() === captchaRedis.toLowerCase())) {
      return BackCode.buildResult(CodeEnum.CODE_ERROR)
    }

    // 发送手机验证码
    let codeRes = (await aliyunMessage(phone, randomCode)).data

    // *****************************方案1***********************
    // ! 需考虑: 1.两个redis操作须保证操作原子性. 2.占用了两个空间, 能否只占用一个?
    // // 验证码存入redis
    // redisConfig.set(`${type}:code:` + phone, randomCode, 600)
    // // 存60秒判断的key
    // redisConfig.set(`${type}:over:` + phone, '1', 60)
    // ****************************方案2************************
    // 利用当前时间拼接验证码
    let randomCodeTime = `${Date.now()}_${randomCode}`
    redisConfig.set(`${type}:code:` + phone, randomCodeTime, 600)

    // 删除图形验证码
    redisConfig.del(`${type}:captcha:` + key)

    if (codeRes.code == '200') { // 返回值200代表发送成功, 可在短信云服务商处自定义返回值
      return BackCode.buildSuccessAndMsg({ msg: '发送成功' })
    } else {
      return BackCode.buildError({ msg: '发送失败' })
    }
  }
}

module.exports = NotifyService
