const mongoose = require("mongoose");
const express = require("express");
const app = express();

require("custom-env").env(process.env.NODE_ENV);

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
  console.log("DB CONNECTED");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is running at port : ${port} ....`);
});
