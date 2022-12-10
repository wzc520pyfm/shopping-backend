const DB = require('../config/sequelize')
const BackCode = require('../utils/BackCode')

const BannerService = {
  list: async (location) => {
    const data = await DB.Banner.findAll({ where: { location } })
    return BackCode.buildSuccessAndData({ data })
  }
}

module.exports = BannerService

