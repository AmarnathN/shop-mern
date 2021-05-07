const express = require("express");
const router = express.Router();

const { getOrderById, createOrder } = require("../controllers/order");
const { isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

// middleware
router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post("/order/create/", isSignedIn, pushOrderInPurchaseList, updateStock, createOrder);

module.exports = router;
