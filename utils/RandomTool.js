class RandomTool {
  // 随机生成四位数字
  static randomCode() {
    return /** 下取整 */Math.floor(/** 随机生成0~1间的数 */Math.random() * (9999 - 1000)) + 1000
  }
}


module.exports = RandomTool
