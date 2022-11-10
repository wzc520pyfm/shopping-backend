const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

// 跨域
app.use(cors())
// 解析json数据格式
app.use(bodyParser.json())
// 解析urlencoded数据格式
app.use(bodyParser.urlencoded({ extended: false }))



app.get('/test', (req, res) => {
  res.send('请求成功')
})



// 错误中间件
app.use((err, req, res, next) => {
  // 未登录
  if (err.name === 'UnauthorizedError') {
    return res.send({ code: -1, data: null, msg: '请登录!' })
  }
  // 其他错误
  res.send({ code: -1, data: null, msg: err.message })
})


app.listen(8081, () => {
  console.log('服务启动在：http://127.0.0.1:8081')
})