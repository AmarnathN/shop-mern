const express = require("express");
const router = express.Router();
const {} = require("../controllers/category");
const { isSignedIn, isAdmin } = require("../controllers/auth");
const {
  createShippingAddress,
  getShippingAddressById,
  getShippingAddress,
  getAllShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
} = require("../controllers/shippingAddress");

// middleware
router.param("shippingAddressId", getShippingAddressById);

// routes
router.get("/shippingAddress/:shippingAddressId", isSignedIn, getShippingAddress);

router.get("/shippingAddresses", getAllShippingAddress);

router.post("/shippingAddress/create", isSignedIn, createShippingAddress);

router.put("/shippingAddress/:shippingAddressId", isSignedIn, updateShippingAddress);

router.delete("/shippingAddress/:shippingAddressId", isSignedIn, deleteShippingAddress);

module.exports = router;
