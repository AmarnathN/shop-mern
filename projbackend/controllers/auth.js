const User = require("../models/user");

exports.signup = (req, res) => {
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
