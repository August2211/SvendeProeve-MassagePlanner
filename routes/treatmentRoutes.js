const express = require("express");
const TreatmentController = require("../controllers/treatmentController.js");

const router = express.Router();

router.get("/", TreatmentController.getTreatments);

module.exports = router;