const mongoose = require("mongoose");
const extendSchema = require("../helpers/extendSchema");
const BaseSchema = require("./base");
const { ObjectId } = mongoose.Schema;

var cartSchema = extendSchema(
  BaseSchema,
  {
    product: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    quantity: {
      type: Number,
      trim: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
