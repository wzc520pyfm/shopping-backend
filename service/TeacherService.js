const DB = require('../config/sequelize')
const BackCode = require('../utils/BackCode')

const TeacherService = {
  list: async () => {
    const list = await DB.Teacher.findAll()
    return BackCode.buildSuccessAndData({ data: list })
  }
}

module.exports = TeacherService
