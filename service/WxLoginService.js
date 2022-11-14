const SecretTool = require('../utils/SecretTool')
const { getOR } = require('../config/wechatLogin')
const redisConfig = require('../config/redisConfig')
const BackCode = require('../utils/BackCode')
const { WX_TOKEN } = process.env

const WxLoginService = {
  wechat_insert: (signature, timestamp, nonce, echostr) => {
    let token = WX_TOKEN
    let str = SecretTool.sha1([token, timestamp, nonce].sort().join(''))

    if (str === signature) {
      return echostr
    }
  },
  login: async () => {
    // 获取二维码url
    // tip: 记得把主机的ip加入微信白名单(使用测试号测试时不需要)
    let { qrcodeUrl, ticket } = await getOR()
    // 将ticket存入redis缓存
    let key = `wechat:ticket:${ticket}`
    redisConfig.set(key, JSON.stringify({ isScan: 'no' }, 120))
    return BackCode.buildSuccessAndData({ data: { qrcodeUrl, ticket } })
  }
}


module.exports = WxLoginService
