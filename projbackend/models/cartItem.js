const mongoose = require("mongoose");
const extendSchema = require("../helpers/extendSchema");
const BaseSchema = require("./base");
const { ObjectId } = mongoose.Schema;

var cartItemSchema = extendSchema(
  BaseSchema,
  {
    quantity: {
      type: Number,
      trim: true,
      default: 0,
    },
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
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

cartItemSchema.virtual("total").get(function () {
  return this.quantity * this.product.price;
});

module.exports = mongoose.model("CartItem", cartItemSchema);
