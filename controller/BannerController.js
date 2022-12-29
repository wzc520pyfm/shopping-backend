/**
 * @params list banner接口
 *  - 依据不同的location获取不同的轮播图
 */

const BannerService = require('../service/BannerService.js')

const BannerController = {
  list: async (req, res) => {
    let { location } = req.query
    let handleRes = await BannerService.list(location)
    res.send(handleRes)
  },
}

module.exports = BannerController
