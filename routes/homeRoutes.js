const express = require("express");
const HomeController = require("../controllers/homeController.js");

const router = express.Router();

router.get("/", HomeController.getIndex);

module.exports = router;