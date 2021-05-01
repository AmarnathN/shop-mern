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

require("custom-env").env(process.env.NODE_ENV);

// DB Connection
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
  console.log("DB CONNECTED");
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

//Starting the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App is running at port : ${port} ....`);
});
