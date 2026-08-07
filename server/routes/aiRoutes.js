const express = require("express");

const router = express.Router();

const { getHealthAdvice } = require("../controllers/aiController");

router.post("/", getHealthAdvice);

module.exports = router;