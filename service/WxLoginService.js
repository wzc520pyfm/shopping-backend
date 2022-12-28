const SecretTool = require('../utils/SecretTool')
const { getOR } = require('../config/wechatLogin')
const redisConfig = require('../config/redisConfig')
const BackCode = require('../utils/BackCode')
const CodeEnum = require('../utils/CodeEnum')
const WxDataTool = require('../utils/WxDataTool')
const DB = require('../config/sequelize')
const RandomTool = require('../utils/RandomTool')
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
  },
  wechat_message: async (req) => {
    // 处理微信发送的数据
    let xmlData = await WxDataTool.getXMLStr(req)
    let objectData = await WxDataTool.getObject(xmlData)
    let lastData = WxDataTool.getLastData(objectData.xml)

    // 根据openid判断是否注册过
    let openidRes = await DB.Account.findAll({ where: { openid: lastData.FromUserName }, /** 返回原始对象 */raw: true })
    // 随机生成用户的头像和昵称
    let head_img = RandomTool.randomAvatar()
    let username = RandomTool.randomName()
    let user = null
    // 未注册则插入数据
    if (openidRes.length === 0) {
      let resData = await DB.Account.create({ head_img, username, openid: lastData.FromUserName })
      user = { head_img, username, id: resData.toJSON().id } // toJSON也可以达到raw: true的效果
    } else {
      // 注册过
      user = { head_img: openidRes[0].head_img, username: openidRes[0].username, id: openidRes[0].id }
    }

    // 生成token
    let token = SecretTool.jwtSign(user, '168h')

    // 更新redis状态
    let key = `wechat:ticket:${lastData.Ticket}`
    const existsKey = await redisConfig.exists(key)
    if (existsKey) {
      redisConfig.set(key, JSON.stringify({ isScan: 'yes', token }), 120)
    }

    // 返回微信服务器的内容
    let content = ''
    if (lastData.MsgType === 'event') {
      if (lastData.Event === 'SCAN') { // 扫码, 不是第一次登录
        content = '欢迎回来!'
      } else if (lastData.Event === 'subscribe') { // 订阅/关注, 第一次扫码登录
        content = '感谢关注!'
      }

      // 构建xml数据
      let msgStrXml = `<xml>
        <ToUserName><![CDATA[${lastData.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${lastData.ToUserName}]]></FromUserName>
        <CreateTime>${Date.now()}</CreateTime>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[${content}]]></Content>
      </xml>`

      return msgStrXml
    }
  },
  check_scan: async (req) => {
    let { ticket } = req.query
    let key = `wechat:ticket:${ticket}`
    let redisData = JSON.parse(await redisConfig.get(key))
    if (redisData && redisData.isScan === 'yes') {
      let { token } = redisData
      return BackCode.buildSuccessAndData({ data: `Bearer ${token}` })
    } else {
      return BackCode.buildResult(CodeEnum.WECHAT_WAIT_SCAN)
    }
  }
}


module.exports = WxLoginService
