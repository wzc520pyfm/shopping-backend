const express = require('express')
const app = express()
const dotenv = require("dotenv")
// 加载环境变量(应尽早执行以保证环境变量可用)
dotenv.config()
const cors = require('cors')
const bodyParser = require('body-parser')
const { expressjwt: jwt } = require('express-jwt')
const { jwtSecretKey } = require('./config/jwtSecretKey')


// 跨域
app.use(cors())

// 解析json数据格式
app.use(bodyParser.json())

// 解析urlencoded数据格式
app.use(bodyParser.urlencoded({ extended: false }))

// 用户认证中间件
app.use(jwt({ secret: jwtSecretKey, algorithms: ['HS256'] }).unless({
  path: [
    /^\/api\/user\/v1\/register/, // 注册
    /^\/api\/user\/v1\/forget/, // 设置密码
    /^\/api\/user\/v1\/login/, // 登录
    /^\/api\/notify\/v1/, // 图形验证码接口
    /^\/api\/wx_login\/v1/, // 图形验证码接口
    /^\/api\/banner\/v1/, // banner接口
    /^\/api\/product\/v1/, // banner接口
  ]
}))

// 通知相关的接口
const notifyRouter = require('./router/notify.js')
app.use('/api/notify/v1', notifyRouter)
// 用户相关的接口
const userRouter = require('./router/user.js')
app.use('/api/user/v1', userRouter)
// 微信登录相关的接口
const wxLoginRouter = require('./router/wxLogin.js')
app.use('/api/wx_login/v1', wxLoginRouter)
// banner接口
const bannerRouter = require('./router/banner.js')
app.use('/api/banner/v1', bannerRouter)
// 视频课程接口
const productRouter = require('./router/product.js')
app.use('/api/product/v1', productRouter)



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