class RandomTool {
  // 随机生成四位数字
  static randomCode() {
    return /** 下取整 */Math.floor(/** 随机生成0~1间的数 */Math.random() * (9999 - 1000)) + 1000
  }

  // 随机生成头像
  static randomAvatar() {
    let imgList = [
      'https://clover-shopping-oss.wzc520pyf.cn/default/head_img/10.jpeg',
      'https://clover-shopping-oss.wzc520pyf.cn/default/head_img/11.jpeg',
      'https://clover-shopping-oss.wzc520pyf.cn/default/head_img/12.jpeg',
      'https://clover-shopping-oss.wzc520pyf.cn/default/head_img/13.jpeg',
      'https://clover-shopping-oss.wzc520pyf.cn/default/head_img/14.jpeg',
      'https://clover-shopping-oss.wzc520pyf.cn/default/head_img/15.jpeg',
      'https://clover-shopping-oss.wzc520pyf.cn/default/head_img/16.jpeg',
      'https://clover-shopping-oss.wzc520pyf.cn/default/head_img/17.jpeg',
      'https://clover-shopping-oss.wzc520pyf.cn/default/head_img/18.jpeg',
      'https://clover-shopping-oss.wzc520pyf.cn/default/head_img/19.jpeg',
    ];
    let num = Math.floor(Math.random() * 10)
    return imgList[num]
  }

  // 随机生成昵称
  static randomName() {
    let nameList = [
      'lalala2345',
      'lalala2934',
      'lalala0443',
      'lalala8432',
      'lalala1238',
      'lalala1934',
      'lalala9235',
      'lalala2454',
      'lalala5477',
      'lalala8753',
    ];
    let num = Math.floor(Math.random() * 10)
    return nameList[num]
  }

}


module.exports = RandomTool
