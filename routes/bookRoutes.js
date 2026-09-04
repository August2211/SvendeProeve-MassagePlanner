const express = require("express");
const bookController = require("../controllers/bookController.js");

const router = express.Router();

router.get("/", bookController.getBookForm);
router.post("/", bookController.postBooking);

module.exports = router;