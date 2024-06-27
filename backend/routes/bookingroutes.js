const express = require("express");
const router = express.Router();
const serviceBookingController = require("../controllers/bookingcontroller");
const verifyToken = require("../middlewares/Verifytoken");
const multer = require("../middlewares/Multer");

router.get("/getServicebooking/:id", serviceBookingController.getServicebooking);

module.exports = router;
