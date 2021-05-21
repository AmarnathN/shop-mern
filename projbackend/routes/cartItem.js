const express = require("express");
const router = express.Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getAllCartItems, getCartItem, getCartItemById, modifyCartItem, deleteCartItem } = require("../controllers/cartItem");

// routes
router.param("cartItemId", getCartItemById);

router.get("/cartItem/:cartItemId", isSignedIn, getCartItem);

router.get("/cartItems", isSignedIn, getAllCartItems);

router.post("/cartItem/modifyItem", isSignedIn, modifyCartItem);

router.delete("/cartItem/:cartItemId", isSignedIn, deleteCartItem);

module.exports = router;
