/**
 * @params list 讲师列表接口
 */

 const TeacherService = require('../service/TeacherService.js')

 const TeacherController = {
   list: async (req, res) => {
     let handleRes = await TeacherService.list()
     res.send(handleRes)
   },
 }
 
 module.exports = TeacherController
 