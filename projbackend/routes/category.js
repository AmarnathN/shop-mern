const express = require("express");
const router = express.Router();
const {
  getCategoryById,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  createCategory,
} = require("../controllers/category");
const { isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// middleware
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// routes
router.get("/category/:categoryId", isSignedIn, getCategory);

router.get("/categories", getAllCategories);

router.post("/category/create", isSignedIn, isAdmin, createCategory);

router.put("/category/:categoryId", isSignedIn, isAdmin, updateCategory);

router.delete("/category/:categoryId", isSignedIn, isAdmin, deleteCategory);

module.exports = router;
