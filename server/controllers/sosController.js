const SOS = require("../models/sos");

// Send SOS
const sendSOS = async (req, res) => {
  try {
    const sos = await SOS.create({
      user: req.user.id,
      message: "Emergency SOS Triggered",
      status: "Sent",
    });

    res.status(201).json({
      message: "🚨 SOS Sent Successfully",
      sos,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get SOS History
const getSOSHistory = async (req, res) => {
  try {
    const history = await SOS.find({ user: req.user.id }).sort({
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