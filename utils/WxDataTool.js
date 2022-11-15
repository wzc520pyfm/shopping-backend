const { parseString } = require('xml2js')

class WxDataTool {
  // 以流的形式处理微信传来的参数
  static getXMLStr(req) {
    return new Promise((resolve, reject) => {
      let data = ''
      req.on('data', (msg) => {
        data += msg.toString()
      })
      req.on('end', () => {
        resolve(data)
      })
    })
  }

  // 将XML的数据转成对象形式
  static getObject(data) {
    return new Promise((resolve, reject) => {
      parseString(data, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  // 将数据优化成普通对象(getObject转化后, 所有属性的值都是数组)
  static getLastData = (query) => {
    let obj = {}
    if (query && typeof query === 'object') {
      for (let key in query) {
        let value = query[key]
        if (value && value.length > 0) {
          obj[key] = value[0]
        }
      }
    }
    return obj
  }

}


module.exports = WxDataTool
