const express = require("express");
const router = express.Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getAllCartItems, getCartItem, getCartItemById, modifyCartItem } = require("../controllers/cart");

// // routes
// router.param("cartId", getCartItemById);

router.get("/cart/:cartId", isSignedIn, getCartItem);

router.get("/cartItems", isSignedIn, getAllCartItems);

router.post("/cart/modifyItem", isSignedIn, modifyCartItem);

module.exports = router;
