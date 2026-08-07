const SOS = require("../models/sos");
const sendEmail = require("../utils/sendEmail");

// Send SOS
const sendSOS = async (req, res) => {
  try {
    const sos = await SOS.create({
      user: req.user.id,
      message: "Emergency SOS Triggered",
      status: "Sent",
    });

    // Send Email
    await sendEmail(
      process.env.EMAIL_USER,
      "🚨 Emergency SOS Alert",
      `
🚨 Emergency Alert!

A user has pressed the SOS button.

Please check immediately.

Emergency AI Wrist Band
      `
    );

    res.status(201).json({
      message: "🚨 SOS Sent Successfully",
      sos,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get SOS History
const getSOSHistory = async (req, res) => {
  try {
    const history = await SOS.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  sendSOS,
  getSOSHistory,
};