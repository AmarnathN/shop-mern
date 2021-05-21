const { DEFAULT_QUERY_PAGE_LIMIT } = require("../constants/projectConstants");
const Cart = require("../models/cart");
const User = require("../models/user");

exports.getCartItemById = (req, res, next, id) => {
  Cart.findById(id).exec((err, cart) => {
    if (!cart) {
      return res.status(404).json({ error: "No cart item found" });
    }
    if (err) {
      return res.status(400).json({ message: "Error in finding Cart iyem", error: err });
    }
    req.cart = cart;
    next();
  });
};

exports.getCartItem = (req, res) => {
  return res.json(req.cart);
};

exports.getAllCartItems = async (req, res) => {
  let limit = req.query.limit == undefined ? DEFAULT_QUERY_PAGE_LIMIT : parseInt(req.query.limit);
  let sortBy = req.query.sortBy || "updatedAt";

  let user = await User.findOne({ _id: req.jwt_auth._id }).lean().exec();
  Cart.find({ user: user._id })
    .populate("user")
    .populate("product")
    .sort([[sortBy, -1]])
    .limit(limit)
    .exec((err, cartItems) => {
      if (err || cartItems.length == 0) {
        return res.status(404).json({ error: "No cart Items found" });
      }
      return res.json(cartItems);
    });
};

exports.modifyCartItem = async (req, res) => {
  let { product } = req.body;
  let user = await User.findOne({ _id: req.jwt_auth._id }).lean().exec();
  req.body.user = user;
  let macthedCartItem = await Cart.findOne({ product: product, user: user }).exec();
  if (macthedCartItem) {
    console.log(req.body.quantity);
    console.log(macthedCartItem.quantity);

    req.body.quantity = Number.parseInt(req.body.quantity) + Number.parseInt(macthedCartItem.quantity);
    console.log(req.body.quantity);
    Cart.findOneAndUpdate({ product: product, user: user }, { $set: req.body }, { new: true, useFindAndModify: false }, (err, cart) => {
      if (err) {
        return res.status(400).json({ error: "unable to update cart info" });
      }
      res.json(cart);
    });
  } else {
    Cart.create(req.body, (err, cart) => {
      if (err) {
        return res.status(400).json({ message: "Unable to create Cart item", error: err });
      }
      res.json(cart);
    });
  }
};
