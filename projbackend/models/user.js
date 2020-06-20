const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 64,
      trim: true,
    },
    last_name: {
      type: String,
      maxlength: 64,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    user_info: {
      type: String,
      trim: true,
    },
    //TODO: Have to comeback here
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      deafult: 0,
    },
    purchases: {
      type: Array,
      deafult: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.method = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password;
  },
  securePassword: function (plainPassword) {
    if (!plainPassword) {
      return "";
    }
    try {
      return crypto.createHmac("sha256", this.salt).update(plainPassword).digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
