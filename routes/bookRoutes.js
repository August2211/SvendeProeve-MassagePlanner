const express = require("express");
const BookController = require("../controllers/bookController.js");

const router = express.Router();

router.get("/", BookController.getBookForm);
router.post("/", BookController.postBooking);

module.exports = router;