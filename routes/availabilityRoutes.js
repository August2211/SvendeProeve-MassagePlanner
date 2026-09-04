const express = require("express");
const availabilityController = require("../controllers/availabilityController.js");

const router = express.Router();

router.get("/", availabilityController.getAvailability);

module.exports = router;