const Redis = require('ioredis')
const { REDIS_PORT, REDIS_HOST, REDIS_PWD } = process.env

const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST,
  password: REDIS_PWD
})

const redisConfig = {
  // redis存数据
  set: (key, value, time) => {
    time ? redis.set(key, value, 'EX', time) : redis.set(key, value)
  },

  // redis获取数据
  get: (key) => {
    return redis.get(key)
  },
}

module.exports = redisConfig
