const svgCaptcha = require('svg-captcha')
const redisConfig = require('../config/redisConfig')

const NotifyService = {
  /**
   * @param {string} key 用户唯一标识
   * @param {enum['register', 'login']} type 验证码类别
   * @returns 
   */
  captcha: async (key, type) => {
    let captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 1, //干扰线
      background: '#aaa' // 背景颜色
    })
    redisConfig.set(`${type}:captcha:` + key, captcha.text, 600) // 将生成的验证码存入redis, 过期时间为10分钟

    return captcha.data // 返回完整的验证码信息
  }
}

module.exports = NotifyService
