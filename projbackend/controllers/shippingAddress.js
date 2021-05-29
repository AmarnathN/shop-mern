const { DEFAULT_QUERY_PAGE_LIMIT } = require("../constants/projectConstants");
const ShippingAddress = require("../models/shippingAddress");
const User = require("../models/user");

exports.getShippingAddressById = (req, res, next, id) => {
  ShippingAddress.findById(id)
    .populate("user", "_id role name email")
    .exec((err, shippingAddress) => {
      if (!shippingAddress) {
        return res.status(404).json({ error: "No shipping Address found" });
      }
      if (err) {
        return res.status(400).json({ message: "Error in finding shippingAddress", error: err });
      }
      req.shippingAddress = shippingAddress;
      next();
    });
};

exports.getShippingAddress = (req, res) => {
  return res.json(req.shippingAddress);
};

exports.getAllShippingAddress = (req, res) => {
  let limit = req.query.limit == undefined ? DEFAULT_QUERY_PAGE_LIMIT : parseInt(req.query.limit);
  let sortBy = req.query.sortBy || "updatedAt";
  ShippingAddress.find()
    .populate("user", "_id role name email")
    .sort([[sortBy, -1]])
    .limit(limit)
    .exec((err, shippingAddresses) => {
      if (err || shippingAddresses.length == 0) {
        return res.status(404).json({ error: "No Shipping Addresses found" });
      }
      res.json(shippingAddresses);
    });
};

exports.createShippingAddress = async (req, res) => {
  req.body.user = await User.findOne({ _id: req.jwt_auth._id }).lean().exec();

  ShippingAddress.create(req.body, (err, shippingAddress) => {
    if (err) {
      return res.status(400).json({ message: "Unable to create shipping Address", error: err });
    }
    res.json(shippingAddress);
  });
};

exports.updateShippingAddress = (req, res) => {
  ShippingAddress.findOneAndUpdate(
    { _id: req.shippingAddress._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, shippingAddress) => {
      if (err) {
        return res.status(400).json({ error: "unable to update Shipping Address info" });
      }
      res.json(shippingAddress);
    }
  );
};

exports.deleteShippingAddress = (req, res) => {
  ShippingAddress.deleteOne({ _id: req.shippingAddress._id }, (err, shippingAddress) => {
    if (err) {
      return res.status(400).json({ message: "Error deleting shipping Address ", error: err });
    }
    res.json({ message: "Deleted the shipping Address" });
  });
};
