const express = require("express");
const treatmentController = require("../controllers/treatmentController.js");

const router = express.Router();

router.get("/", treatmentController.getTreatments);

module.exports = router;