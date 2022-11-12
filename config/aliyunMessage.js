const axios = require('axios')
const { ALI_SMS_APP_CODE } = process.env

const sendMsgCode = (phone, randomCode) => {
  // 使用第三方厂商的测试接口: https://market.aliyun.com/products/57000002/cmapi00046920.html
  return axios({
    method: 'post',
    url: `https://jmsms.market.alicloudapi.com/sms/send?mobile=${phone}&templateId=M105EABDEC&value=${randomCode}`,
    headers: { 'Authorization': 'AppCode ' + ALI_SMS_APP_CODE }
  })
  // 在申请到阿里云短信(https://www.aliyun.com/product/sms)后, 使用:
  // return axios({
  //   method: 'post',
  //   url: 'your aliyun sms url',
  //   data: {
  //     appid: 'tgPIDvMiY18E8YCIDz',
  //     appSecret: "btIRgTeIpzWHf7JX1Ocrfw06yZdbzSuu",
  //     code: randomCode,
  //     phoneNum: phone,
  //     templateCode: "SMS_168782432"
  //   }
  // })
}

// 测试短信能否成功发送(需确保ALI_SMS_APP_CODE环境变量已成功加载)
// (async () => {
//   console.log((await sendMsgCode(17816134129, '1234')).data)
// })()

module.exports = sendMsgCode;
