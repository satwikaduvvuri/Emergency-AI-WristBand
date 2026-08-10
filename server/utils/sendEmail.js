const nodemailer = require("nodemailer");

// Check email credentials
console.log("📧 EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "🔐 EMAIL_PASS:",
  process.env.EMAIL_PASS ? "Available" : "Missing"
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Email
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
    });

    console.log("✅ Email sent successfully to:", to);
    return true;
  } catch (error) {
    console.log("❌ Email sending failed:", error.message);
    throw error;
  }
};

module.exports = sendEmail;