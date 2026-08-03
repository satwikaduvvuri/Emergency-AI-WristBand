const express = require("express");
const router = express.Router();

const {
  addContact,
  getContacts,
} = require("../controllers/contactController");

const authMiddleware = require("../middleware/authMiddleware");

// Add Emergency Contact
router.post("/", authMiddleware, addContact);

// Get All Contacts
router.get("/", authMiddleware, getContacts);

module.exports = router;