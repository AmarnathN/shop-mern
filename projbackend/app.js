const mongoose = require("mongoose");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const cartItemRoutes = require("./routes/cartItem");
const razorpayRoutes = require("./routes/razorpay");
const shippingAddressRoutes = require("./routes/shippingAddress");

const routesList = require("express-routes-catalogue");

require("custom-env").env(process.env.NODE_ENV);

// DB Connection
mongoose
  .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

// MIddlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes middleware

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", cartItemRoutes);
app.use("/api", shippingAddressRoutes);
app.use("/api", razorpayRoutes);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  }
});

routesList.default.web(
  app,
  "/routes-list"
);
// routesList.default.terminal(app)

//Starting the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App is running at port : ${port} ....`);
});
