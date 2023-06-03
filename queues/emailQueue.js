// queues/emailQueue.js
const Queue = require("bull");
const redis = require("../config/redisServer");
const sendOTPEmail = require("../workers/sendOTPEmail");
const sendRegisterEmail = require("../workers/sendRegisterEmail");

const emailQueue = new Queue("email", { redis });

// Process the sendOTPEmail job
emailQueue.process("sendOTPEmail", sendOTPEmail);

// Process the sendRegisterEmail job
emailQueue.process("sendRegisterEmail", sendRegisterEmail);

module.exports = emailQueue;
