class GetUserInfoTool {
  static getIp(req) {
    let ip = req.ip.match(/\d+.\d+.\d+.\d+/).join('.')
    return ip
  }

  static getUseragent(req) {
    let useragent = req.headers['user-agent']
    return useragent
  }
}

module.exports = GetUserInfoTool
