class BackCode {
  constructor({ code, data, msg }) {
    this.code = code
    this.data = data
    this.msg = msg
  }

  // 请求成功, 只返回code
  static buildSuccess() {
    return new BackCode({ code: 0, data: null, msg: null }).toJson()
  }

  // 请求成功, 只返回code+data内容
  static buildSuccessAndData(data) {
    return new BackCode({ code: 0, data: data, msg: null }).toJson()
  }

  // 请求失败, 只返回code+msg内容
  static buildError(msg) {
    return new BackCode({ code: -1, data: null, msg: msg }).toJson()
  }

  // 自定义返回code+msg内容
  static buildResult(codeEnum) {
    return new BackCode({ code: codeEnum.code, data: null, msg: codeEnum.msg }).toJson()
  }

  toJson() {
    return {
      code: this.code,
      data: this.data,
      msg: this.msg
    }
  }
}

module.exports = BackCode