const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var orderItemSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});
const OrderItem = mongoose.model("OrderItem", orderItemSchema);

var orderSchema = new mongoose.Schema(
  {
    orderItems: [orderItemSchema],
    transactionId: {},
    amount: {
      type: Number,
    },
    status: {
      type: String,
      default: "RECEIVED",
      enum: {
        values: ["RECEIVED", "PROCESSING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"],
        message: "{VALUE} is not supported",
      },
    },
    address: {
      type: ObjectId,
      ref: "Address",
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, OrderItem };
