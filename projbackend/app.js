const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect(
    "mongodb+srv://shop_mern_user_1:DvuSUED7IPye6iuw@shop-mern-cluster.y3uvk.mongodb.net/shop-mern-main?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("DB CONNECTED");
  });

const port = 8000;

app.listen(port, () => {
  console.log(`App is running at port : ${port} ....`);
});
