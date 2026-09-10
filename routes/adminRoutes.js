const express = require("express");
const AvailabilityController = require("../controllers/availabilityController.js");
const BookingsController = require("../controllers/bookingsController.js");
const TreatmentController = require("../controllers/treatmentController.js");

const router = express.Router();

router.get("/availability", AvailabilityController.getAdminAvailability);
router.get("/availability/:id/edit", AvailabilityController.getEditAvailability);
router.post("/availability/:id/edit", AvailabilityController.postEditAvailability);
router.post("/availability/:id/delete", AvailabilityController.postDeleteAvailability);
router.post("/availability", AvailabilityController.postAvailability);

router.get("/bookings", BookingsController.getBookings);
router.get("/bookings/:id/edit", BookingsController.getEditBooking);
router.post("/bookings/:id/edit", BookingsController.postEditBooking);
router.post("/bookings/:id/delete", BookingsController.postDeleteBooking);

router.get("/treatments", TreatmentController.getAdminTreatment);
router.get("/treatments/:id/edit", TreatmentController.getEditTreatment);
router.post("/treatments/:id/edit", TreatmentController.postEditTreatment);
router.post("/treatments/:id/delete", TreatmentController.postDeleteTreatment);
router.post("/treatments", TreatmentController.postTreatment);

module.exports = router;