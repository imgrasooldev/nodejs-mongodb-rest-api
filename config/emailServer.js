// config/email.js
const nodemailer = require("nodemailer");
// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

module.exports = transporter;
