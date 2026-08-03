const express = require("express");
const router = express.Router();

const {
  sendSOS,
  getSOSHistory,
} = require("../controllers/sosController");

const authMiddleware = require("../middleware/authMiddleware");

// Send SOS
router.post("/", authMiddleware, sendSOS);

// Get SOS History
router.get("/", authMiddleware, getSOSHistory);

module.exports = router;