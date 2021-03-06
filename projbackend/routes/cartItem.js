const express = require("express");
const router = express.Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const {
  getAllCartItems,
  getCartItem,
  getCartItemById,
  modifyCartItem,
  deleteCartItem,
  emptyUserCartItems,
} = require("../controllers/cartItem");

// routes
router.param("cartItemId", getCartItemById);

router.get("/cartItem/:cartItemId", isSignedIn, getCartItem);

router.get("/cartItems", isSignedIn, getAllCartItems);

router.post("/cartItem/modify", isSignedIn, modifyCartItem);

router.delete("/cartItem/:cartItemId", isSignedIn, deleteCartItem);

router.delete("/user/cartItems", isSignedIn, emptyUserCartItems);

module.exports = router;
