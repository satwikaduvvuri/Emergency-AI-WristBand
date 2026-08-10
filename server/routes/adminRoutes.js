const express = require("express");

const {
  getAdminStats,
  getAllUsers,
  getAllSOS,
} = require("../controllers/adminController");

const router = express.Router();

// Admin Statistics
router.get("/stats", getAdminStats);

// All Users
router.get("/users", getAllUsers);

// All SOS Alerts
router.get("/sos", getAllSOS);

module.exports = router;