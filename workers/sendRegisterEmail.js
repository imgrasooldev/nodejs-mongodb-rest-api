// workers/sendRegisterEmail.js
const transporter = require("../config/emailServer");

const sendRegisterEmail = async (job) => {
  try {
    const { email, name } = job.data;

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: "Registration Confirmation",
      html: `
        <h1>Registration Confirmation</h1>
        <p>Dear ${name},</p>
        <p>Thank you for registering with our app!</p>
        <p>We look forward to having you as a valued member.</p>
        <p>Best regards,</p>
        <p>Your App Team</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log(`Register email sent to ${email} for user ${name}`);
  } catch (error) {
    console.error("Send register email error:", error);
  }
};

module.exports = sendRegisterEmail;
