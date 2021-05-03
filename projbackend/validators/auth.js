const { check } = require("express-validator");
const User = require("../models/user");

const validatePassword = (password, { req }) => {
  errors = [];
  if (password.length < 4) {
    errors.push("Your password must be at least 4 characters.");
  }
  if (password.search(/[a-zA-Z]/) < 0) {
    errors.push("Your password must contain at least one letter.");
  }
  if (password.search(/[0-9]/) < 0) {
    errors.push("Your password must contain at least one digit.");
  }
  if (password.search(/(?=.*[!@#$%^&*])/) < 0) {
    errors.push("Your password must contain at least one special charater in '!@#$%^&*'");
  }
  if (errors.length > 0) {
    return Promise.reject(errors.join("\\n"));
  }
  return true;
};

const validateEmail = async (email) => {
  user = await User.findOne({ email });
  if (user) {
    return Promise.reject("E-mail already in use");
  }
  return true;
};

exports.signUpValidationRules = () => {
  return [
    check("email").isEmail().custom(validateEmail),
    check("password").custom(validatePassword),
    check("name", "Name length should be min 4 characters").isLength({ min: 4 }),
  ];
};

exports.signInValidationRules = () => {
  return [check("email").isEmail(), check("password").isLength({ min: 1 })];
};
