const User = require("../models/user");
const _ = require("lodash");
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: "No user found" });
    }
    req.profile = user;
    next();
  });
  // having next() here causing issue
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
  User.find()
    .lean() // this would return plain JS objects
    .exec((err, users) => {
      if (err || !users) {
        return res.status(404).json({ error: "No users found" });
      }
      filteredUsers = users.map((user) => {
        return _.omit(user, ["salt", "encry_password"]);
      });
      res.json(filteredUsers);
    });
};
