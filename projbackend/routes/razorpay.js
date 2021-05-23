const express = require("express");
const { isSignedIn } = require("../controllers/auth");
const router = express.Router();
const { createRazorpayOrder } = require("../controllers/razorpay");

// routes
router.post("/razorpay/", isSignedIn, createRazorpayOrder);

module.exports = router;
