const { Order } = require("../models/order");
const User = require("../models/user");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("orderItems.product", "name price")
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
