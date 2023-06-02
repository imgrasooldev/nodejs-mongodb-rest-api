const transporter = require("../config/emailService");

// Function to send registration email
const sendRegisterEmail = async (email, name) => {
  try {
    // Compose the email
    const mailOptions = {
      from: "YOUR_SENDER_EMAIL",
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
    console.log("Registration email sent successfully!");
  } catch (error) {
    console.error("Error sending registration email:", error);
  }
};

module.exports = { sendRegisterEmail };
