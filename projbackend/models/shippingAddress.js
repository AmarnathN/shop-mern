const mongoose = require("mongoose");
const extendSchema = require("../helpers/extendSchema");
const BaseSchema = require("./base");
const { ObjectId } = mongoose.Schema;

var shippingAddressSchema = extendSchema(
  BaseSchema,
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    addressLine1: {
      type: String,
      required: true,
      maxlength: 128,
      trim: true,
    },
    addressLine2: {
      type: String,
      maxlength: 128,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    zip: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShippingAddress", shippingAddressSchema);
