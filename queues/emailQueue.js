// queues/emailQueue
const Queue = require("bull");
const redis = require("../config/redisServer");

// Create a queue for sending emails
const EmailQueue = new Queue("email", { redis });

module.exports = EmailQueue;
