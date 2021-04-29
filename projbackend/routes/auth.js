const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signout, signup, signin, validatePassword, validateEmail } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("email").isEmail().custom(validateEmail),
    check("password").custom(validatePassword),
    check("name", "Name length should be min 4 characters").isLength({ min: 4 }),
  ],
  signup
);
router.post("/signin", [check("email").isEmail(), check("password").isLength({ min: 1 })], signin);
router.get("/signout", signout);

module.exports = router;
