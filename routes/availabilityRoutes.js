const express = require("express");
const AvailabilityController = require("../controllers/availabilityController.js");

const router = express.Router();

router.get("/", AvailabilityController.getAvailability);

module.exports = router;