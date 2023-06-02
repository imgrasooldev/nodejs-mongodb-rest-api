// config/redisServer.js
const redis = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

module.exports = redis;
