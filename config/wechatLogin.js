const axios = require('axios')
const { WX_APP_ID, WX_APP_SECRET } = process.env
// see: https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
const appId = WX_APP_ID
const appSecret = WX_APP_SECRET
const accessTokenPC = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
const qrUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode'

// 获取微信的access_token
const getAccessToken = () => {
  return axios({
    method: 'get',
    url: accessTokenPC
  })
}

// 获取拼接微信二维码url的ticket
const getTicket = (token) => {
  // see: https://developers.weixin.qq.com/doc/offiaccount/Account_Management/Generating_a_Parametric_QR_Code.html
  return axios({
    method: 'post',
    url: `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${token}`,
    data: { 
      expire_seconds: 60 * 2, // 存活时间(分钟)
      action_name: "QR_SCENE", 
      action_info: { 
        scene: { scene_id: 123 } 
      } 
    }
  })
}

// 获取微信二维码url
// see: // see: https://developers.weixin.qq.com/doc/offiaccount/Account_Management/Generating_a_Parametric_QR_Code.html
const wechatLogin = {
  getOR: async () => {
    let token = (await getAccessToken()).data.access_token
    let ticket = (await getTicket(token)).data.ticket
    return { qrcodeUrl: `${qrUrl}?ticket=${ticket}`, ticket }
  }
}


module.exports = wechatLogin
