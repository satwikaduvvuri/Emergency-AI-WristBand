const User = require("../models/User");
const SOS = require("../models/sos");

// Admin Dashboard Statistics
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSOS = await SOS.countDocuments();

    res.status(200).json({
      totalUsers,
      totalSOS,
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);

    res.status(500).json({
      message: "Failed to fetch admin statistics",
    });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({
      createdAt: -1,
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Get Users Error:", error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};
// Get All SOS Alerts
const getAllSOS = async (req, res) => {
  try {
    const sosHistory = await SOS.find()
      .populate("user", "name email phone")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(sosHistory);
  } catch (error) {
    console.error("Get SOS Error:", error);

    res.status(500).json({
      message: "Failed to fetch SOS history",
    });
  }
};

module.exports = {
  getAdminStats,
  getAllUsers,
  getAllSOS,
};