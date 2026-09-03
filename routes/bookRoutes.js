const express = require("express");
const bookController = require("../controllers/bookController.js");

const router = express.Router();

router.get("/", bookController.showBookForm);
router.post("/", bookController.createBooking);

module.exports = router;