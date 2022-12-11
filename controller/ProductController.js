/**
 * @params category 课程分类接口
 */

const ProductService = require('../service/ProductService.js')

const ProductController = {
  category: async (req, res) => {
    let handleRes = await ProductService.category()
    res.send(handleRes)
  },
}

module.exports = ProductController
