const _ = require("lodash");

const User = require("../models/user");
const Order = require("../models/order");
const { DEFAULT_QUERY_PAGE_LIMIT } = require("../constants/projectConstants");

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
  let limit = parseInt(req.query.limit) || DEFAULT_QUERY_PAGE_LIMIT;
  let sortBy = req.query.sortBy || "updatedAt";
  User.find()
    .sort([[sortBy, -1]])
    .limit(limit)
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

exports.updateUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {
    if (err) {
      return res.status(400).json({ error: "unable to update user info" });
    }
    filteredUser = _.omit(user, ["salt", "encry_password"]);
    res.json(filteredUser);
  });
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate({ path: "user", select: "_id name email" })
    .exec((err, orders) => {
      if (!orders) {
        return res.status(404).json({ message: " NO orders found for user" });
      }
      if (err) {
        return res.status(404).json({ message: " Issue in fetching orders of user", error: err });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let userPurchasesFromOrder = [];
  req.body.order.orderItems.forEach((product) => {
    userPurchasesFromOrder.push({
      _id: product._id,
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      price: product.price,
      transactionId: req.body.order.transactionId,
    });
  });
  // update purchases in document
  User.findOneAndUpdate({ _id: req.jwt_auth._id }, { $push: { purchases: userPurchasesFromOrder } }, { new: true }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: " Issue in updating purchases of user", error: err });
    }
    next();
  });
};
