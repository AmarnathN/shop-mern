const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { getProductById, createProduct, getAllProducts, getProduct } = require("../controllers/product");
const { isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { productValidationRules, productValidate, validateCategory } = require("../validators/product");

// middleware
router.param("userId", getUserById);
router.param("productId", getProductById);

// routes
router.get("/product/:productId", isSignedIn, getProduct);

router.get("/products", getAllProducts);

router.post(
  "/product/create",
  [
    check("name", "Name length should be min 3 characters").isLength({ min: 3 }),
    check("price").exists().isDecimal().withMessage("Only Decimal value allowed"),
    check("category").custom(validateCategory),
    check("photo").notEmpty(),
  ],
  createProduct
);

// router.put("/category/:categoryId", isSignedIn, isAdmin, updateCategory);

// router.delete("/category/:categoryId", isSignedIn, isAdmin, deleteCategory);

module.exports = router;
