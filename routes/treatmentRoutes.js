const express = require("express");
const treatmentController = require("../controllers/treatmentController.js");

const router = express.Router();

router.get("/", treatmentController.showTreatments);

module.exports = router;