const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.validatePassword = (password, { req }) => {
  console.log(req.body);

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

exports.validateEmail = async (email) => {
  user = await User.findOne({ email });
  if (user) {
    return Promise.reject("E-mail already in use");
  }
  return true;
};

exports.signup = (req, res) => {
  // validationResult function checks whether
  // any occurs or not and return an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    res.json({ id: user._id, name: user.name, email: user.email });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "User signed out",
  });
};
