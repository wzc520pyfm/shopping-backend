const { Sequelize } = require('sequelize')
const initModels = require('../models/init-models')
const { DB_NAME, DB_USER, DB_PWD, DB_HOST } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
  host: DB_HOST,
  dialect: 'mysql'
});

(async function () {
  try {
    await sequelize.authenticate()
    console.log('数据库连接成功')
  } catch (error) {
    console.log('数据库连接失败', error)
  }
})()

const models = initModels(sequelize)

module.exports = { ...models, sequelize }
