const express = require("express");
const router = express.Router();

const { getHealthData } = require("../controllers/healthController");

router.get("/", getHealthData);

module.exports = router;