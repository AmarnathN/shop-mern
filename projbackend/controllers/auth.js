const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const fs = require("fs");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    if (!user.authenticate(password)) {
      return res.status(422).json({ error: "Email and password does not Match" });
    }

    // token with RSA SHA256 alogorithm
    // ref : https://siddharthac6.medium.com/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
    // process.env.privateKEY = fs.readFileSync("./private.key", "utf8");
    const PRIVATE_KEY = Buffer.from(process.env.privateKEY , 'base64').toString('ascii');
    var signOptions = {
      expiresIn: "12h",
      algorithm: "RS256", // RSASSA [ "RS256", "RS384", "RS512" ]
    };
    const token = jwt.sign({ _id: user._id }, PRIVATE_KEY, signOptions);

    // process.env.publicKEY = fs.readFileSync("./public.key", "utf8");
    const PUBLIC_KEY = Buffer.from(process.env.publicKEY , 'base64').toString('ascii');
    var verifyOptions = {
      expiresIn: "12h",
      algorithms: ["RS256"],
    };
    jwt.verify(token, PUBLIC_KEY, verifyOptions, function (err, payload) {
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
// process.env.publicKEY = fs.readFileSync("./public.key", "utf8");
const PUBLIC_KEY = Buffer.from(process.env.publicKEY , 'base64').toString('ascii');
exports.isSignedIn = expressJwt({
  secret: PUBLIC_KEY,
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
