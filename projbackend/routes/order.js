const express = require("express");
const router = express.Router();

const { getOrderById, createOrder } = require("../controllers/order");
const { isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// middleware
router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post("/order/create/", isSignedIn, createOrder);

module.exports = router;
