// workers/sendOTPEmail.js
const transporter = require("../config/emailServer");
// Function to send registration email
const sendOTPEmail = async (job) => {
  try {
    const { email, name, otp } = job.data;

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: "OTP Email",
      // text: `Dear ${name}, Your OTP is ${otp}. Please use this OTP to reset your password.`,
      html: `Dear ${name},<br><br><br>Your OTP is ${otp}. Please use this OTP to reset your password.
      `,
    };
    // Send the email
    await transporter.sendMail(mailOptions);
    // Send the email
    console.log(`OTP email sent to ${email} for user ${name}, otp: ${otp}`);
  } catch (error) {
    console.error("Send OTP email error:", error);
  }
};

/* // Process the email queue
CallQueue.process(async (job) => {
  const { email, name } = job.data;
  await sendOTPEmail(email, name);
}); */

module.exports = sendOTPEmail;
