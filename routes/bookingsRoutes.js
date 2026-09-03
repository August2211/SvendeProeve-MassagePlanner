const express = require("express");
const bookingsController = require("../controllers/bookingsController.js");

const router = express.Router();

router.get("/", bookingsController.showBookings);

module.exports = router;