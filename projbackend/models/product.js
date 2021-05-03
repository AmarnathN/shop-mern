const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
      trim: true,
      default: 0,
    },
    sold_units: {
      type: Number,
      trim: true,
      default: 0,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
