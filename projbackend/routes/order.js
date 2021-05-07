const express = require("express");
const router = express.Router();

const { getOrderById, getOrder, createOrder, getAllOrders, updateOrder } = require("../controllers/order");
const { isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

// middleware
router.param("orderId", getOrderById);

router.get("/order/:orderId", isSignedIn, getOrder);
router.post("/order/create/", isSignedIn, pushOrderInPurchaseList, updateStock, createOrder);

router.get("/orders", isSignedIn, getAllOrders);

router.get("/order/:orderId", isSignedIn, updateOrder);

module.exports = router;
