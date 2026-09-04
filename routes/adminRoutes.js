const express = require("express");
const availabilityController = require("../controllers/availabilityController.js");
const bookingsController = require("../controllers/bookingsController.js");

const router = express.Router();

router.get("/availability", availabilityController.getAdminAvailability);
router.post("/availability", availabilityController.postAvailability);

router.get("/bookings", bookingsController.getBookings);

module.exports = router;