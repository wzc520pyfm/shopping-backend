/**
 * @params list banner接口
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
