const mongoose = require("mongoose");
const express = require("express");
const app = express();

// middlewares
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");

require("custom-env").env(process.env.NODE_ENV);

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
  console.log("DB CONNECTED");
});

const port = process.env.PORT || 8000;

// MIddlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.listen(port, () => {
  console.log(`App is running at port : ${port} ....`);
});
