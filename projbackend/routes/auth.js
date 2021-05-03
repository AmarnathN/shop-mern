const express = require("express");
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { signUpValidationRules, signInValidationRules } = require("../validators/auth");
const { validateRules } = require("../validators/common");

router.post("/signup", signUpValidationRules(), validateRules, signup);
router.post("/signin", signInValidationRules(), validateRules, signin);
router.get("/signout", isSignedIn, signout);

module.exports = router;
