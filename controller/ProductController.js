/**
 * @param category 课程分类接口
 * @param card 视频卡片接口
 */

const ProductService = require('../service/ProductService.js')

const ProductController = {
  category: async (req, res) => {
    let handleRes = await ProductService.category()
    res.send(handleRes)
  },
  card: async (req, res) => {
    let handleRes = await ProductService.card()
    res.send(handleRes)
  },
  query_by_cid: async (req, res) => {
    let handleRes = await ProductService.query_by_cid(req)
    res.send(handleRes)
  }
}

module.exports = ProductController
