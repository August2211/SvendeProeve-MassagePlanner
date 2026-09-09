const express = require("express");
const AvailabilityController = require("../controllers/availabilityController.js");
const BookingsController = require("../controllers/bookingsController.js");

const router = express.Router();

router.get("/availability", AvailabilityController.getAdminAvailability);
router.post("/availability", AvailabilityController.postAvailability);

router.get("/bookings", BookingsController.getBookings);

module.exports = router;