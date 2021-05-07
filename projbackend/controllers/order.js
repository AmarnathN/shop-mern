const { Order } = require("../models/order");
const User = require("../models/user");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("orderItems.product", "name price")
    .populate({ path: "user", select: "_id name" })
    .exec((err, order) => {
      if (!order) {
        return res.status(404).json({ error: "No order found" });
      }
      if (err) {
        return res.status(400).json({ message: "Error in finding order", error: err });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = async (req, res) => {
  req.body.order.user = await User.findOne({ _id: req.jwt_auth._id }).lean().exec();
  Order.create(req.body.order, (err, order) => {
    if (err) {
      return res.status(500).json({ message: "Error in Creating order", error: err });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("orderItems.product", "name price")
    .populate("user", "_id name")
    .lean()
    .exec((err, orders) => {
      if (err) {
        return res.status(500).json({ message: "Error in getting all orders", error: err });
      }
      res.json(orders);
    });
};

exports.getOrder = (req, res) => {
  res.json(req.order);
};

exports.updateOrder = (req, res) => {
  Order.findOneAndUpdate({ _id: req.order._id }, { $set: req.body }, { new: true }, (err, order) => {
    if (err) {
      return res.status(400).json({ error: "unable to update Order info" });
    }
    res.json(category);
  });
};
