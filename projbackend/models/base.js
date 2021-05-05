const mongoose = require("mongoose");

var BaseSchema = new mongoose.Schema({
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = BaseSchema;
