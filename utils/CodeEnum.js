/**
 * 特殊得错误返回信息
 */
const CodeEnum = {
  CODE_TO_ERROR: {
    code: 240001,
    msg: '接收号码不合规'
  },
  CODE_LIMITED: {
    code: 240002,
    msg: '60秒不能重复发送'
  },
  CODE_SEND: {
    code: 240003,
    msg: '请发送图形验证码'
  },
  CODE_ERROR: {
    code: 240004,
    msg: '图形验证码错误'
  },
  ACCOUNT_REPEAT: {
    code: 250001,
    msg: '账号已经存在'
  },
  ACCOUNT_UNREGISTER: {
    code: 250002,
    msg: '账号不存在'
  },
  ACCOUNT_PWD_ERROR: {
    code: 250003,
    msg: '账号或者密码错误'
  },
  ACCOUNT_UNLOGIN: {
    code: 250004,
    msg: '账号未登录'
  },
  ACCOUNT_REPEAT_LOGIN: {
    code: 250006,
    msg: '账号在其它设备登录，踢下线'
  },
  ACCOUNT_DISABLED: {
    code: 250007,
    msg: '该账号已冻结，请联系管理员'
  },
  ACCOUNT_STATUS_EXCEPTION: {
    code: 250008,
    msg: '账号状态异常，请联系管理员'
  },
  ORDER_CONFIRM_PRICE_FAIL: {
    code: 260002,
    msg: '创建订单-验价失败'
  },
  ORDER_CONFIRM_REPEAT: {
    code: 260008,
    msg: '订单恶意-重复提交'
  },
  ORDER_CONFIRM_TOKEN_EQUAL_FAIL: {
    code: 260009,
    msg: '订单令牌缺少'
  },
  ORDER_CONFIRM_NOT_EXIST: {
    code: 260010,
    msg: '订单不存在'
  },
  ORDER_REMOVE_FAILED: {
    code: 260011,
    msg: '订单删除失败，该订单已完成'
  },
  PAY_ORDER_FAIL: {
    code: 270001,
    msg: '创建支付订单失败'
  },
  PAY_ORDER_CALLBACK_SIGN_FAIL: {
    code: 270002,
    msg: '支付订单回调验证签失败'
  },
  PAY_ORDER_CALLBACK_NOT_SUCCESS: {
    code: 270003,
    msg: '支付回调更新处理失败'
  },
  PAY_ORDER_NOT_EXIST: {
    code: 270005,
    msg: '订单不存在'
  },
  PAY_ORDER_STATE_ERROR: {
    code: 270006,
    msg: '订单状态不正常'
  },
  PAY_ORDER_PAY_TIMEOUT: {
    code: 270007,
    msg: '订单支付超时'
  },
  PRODUCT_NOY_PAY: {
    code: 280001,
    msg: '商品未购买成功'
  },
  QUESTION_NOT_EXIST: {
    code: 290001,
    msg: '当前提问不存在'
  },
  ANSWER_NOT_EXIST: {
    code: 290002,
    msg: '当前回答不存在'
  },
  COMMENT_NOT_EXIST: {
    code: 290003,
    msg: '当前评论不存在'
  },
  ADD_FAVORITE_REPEAT: {
    code: 290005,
    msg: '重复收藏'
  },
  NO_FAVORITE: {
    code: 290006,
    msg: '未收藏'
  },
  ADD_ANWSER_REPEAT: {
    code: 290007,
    msg: '重复回答'
  },
  ADD_TOO_FAST: {
    code: 290008,
    msg: '内容发送过快'
  },
  COURSE_VIDEO_NO_ENCODE: {
    code: 310001,
    msg: '视频没转码'
  },
  COURSE_VIDEO_NO_EXIST: {
    code: 310404,
    msg: '视频不存在'
  },
  COURSE_VIDEO_REQ_HW_FAIL: {
    code: 310501,
    msg: '请求华为云异常'
  },
  COURSE_VIDEO_REQ_ALIYUN_FAIL: {
    code: 310502,
    msg: '请求阿里云异常'
  },
  COURSE_VIDEO_VOD_TYPE_NO_EXIST: {
    code: 310503,
    msg: 'vod类型错误'
  },
  COURSE_MATERIAL_NO_PERMISSION: {
    code: 310407,
    msg: '没查看权限，请购买'
  },
  OPS_REPEAT: {
    code: 110001,
    msg: '重复操作'
  },
  OPS_NETWORK_ADDRESS_ERROR: {
    code: 110002,
    msg: '网络地址错误'
  },
  OPS_CONTENT_IS_BLANK: {
    code: 110003,
    msg: '内容不能为空'
  },
  WECHAT_LOGIN_FAILED: {
    code: 270002,
    msg: '微信登录异常'
  },
  WECHAT_WAIT_SCAN: {
    code: 270004,
    msg: '等待用户扫码'
  },
  FILE_UPLOAD_USER_IMG_FAIL: {
    code: 700101,
    msg: '用户头像上传失败'
  },
}

module.exports = CodeEnum
