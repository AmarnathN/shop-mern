const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const fs = require("fs");

exports.validatePassword = (password, { req }) => {
  console.log(req.body);

  errors = [];
  if (password.length < 4) {
    errors.push("Your password must be at least 4 characters.");
  }
  if (password.search(/[a-zA-Z]/) < 0) {
    errors.push("Your password must contain at least one letter.");
  }
  if (password.search(/[0-9]/) < 0) {
    errors.push("Your password must contain at least one digit.");
  }
  if (password.search(/(?=.*[!@#$%^&*])/) < 0) {
    errors.push("Your password must contain at least one special charater in '!@#$%^&*'");
  }
  if (errors.length > 0) {
    return Promise.reject(errors.join("\\n"));
  }
  return true;
};

exports.validateEmail = async (email) => {
  user = await User.findOne({ email });
  if (user) {
    return Promise.reject("E-mail already in use");
  }
  return true;
};

exports.signup = (req, res) => {
  // validationResult function checks whether
  // any occurs or not and return an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    res.json({ id: user._id, name: user.name, email: user.email });
  });
};

exports.signin = (req, res) => {
  // validationResult function checks whether
  // any occurs or not and return an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    if (!user.authenticate(password)) {
      return res.status(422).json({ message: "Email and password does not Match" });
    }

    // token with RSA SHA256 alogorithm
    // ref : https://siddharthac6.medium.com/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
    process.env.privateKEY = fs.readFileSync("./private.key", "utf8");
    var signOptions = {
      expiresIn: "12h",
      algorithm: "RS256", // RSASSA [ "RS256", "RS384", "RS512" ]
    };
    const token = jwt.sign({ _id: user._id }, process.env.privateKEY, signOptions);

    process.env.publicKEY = fs.readFileSync("./public.key", "utf8");
    var verifyOptions = {
      expiresIn: "12h",
      algorithms: ["RS256"],
    };
    jwt.verify(token, process.env.publicKEY, verifyOptions, function (err, payload) {
      console.log(`jwt verify error : ${err}`);
      console.log(`jwt verify payload : ${JSON.stringify(payload)}`);
    });

    // set token in cookies which expires in 1hr in milliseconds
    res.cookie("token", token, { expires: new Date(Date.now() + 60 * 60 * 1000) });

    // returning response
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signed out succesfully",
  });
};

// Custom middle wares
process.env.publicKEY = fs.readFileSync("./public.key", "utf8");
exports.isSignedIn = expressJwt({
  secret: process.env.publicKEY,
  userProperty: "jwt_auth",
  algorithms: ["RS256"],
});

exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.jwt_auth && req.jwt_auth._id == req.profile._id;
  if (!checker) {
    return res.status(403).json({ error: "ACCESS DENIED" });
  }
  next();
};

exports.isAdmin = async (req, res, next) => {
  user = await User.findOne({ _id: req.jwt_auth._id }).lean().exec();
  if (!user || user.role == 0) {
    return res.status(403).json({ message: "ACCESS DENIED, restricted to Admin only" });
  }
  next();
};
