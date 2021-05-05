const express = require("express");
const router = express.Router();
const multer = require("multer");

const { getProductById, createProduct, getAllProducts, getProduct, deleteProduct, updateProduct } = require("../controllers/product");
const { isSignedIn, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { productValidationRules } = require("../validators/product");
const { validateRules } = require("../validators/common");

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

// middleware
router.param("userId", getUserById);
router.param("productId", getProductById);

// routes
router.get("/product/:productId", isSignedIn, getProduct);

router.get("/products", getAllProducts);

router.post("/product/create", upload.single("image"), productValidationRules(), validateRules, createProduct);

router.put("/product/:productId", upload.single("image"), isSignedIn, isAdmin, updateProduct);

router.delete("/product/:productId", isSignedIn, isAdmin, deleteProduct);

module.exports = router;
