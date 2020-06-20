const express = require("express");

const app = express();
// const port = 3000;

// app.get("/", (req, res) => res.send("Hello World!"));

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const port = 4000;

app.get("/", (req, res) => {
  return res.send("I am there!!!!");
});

app.get("/login", (req, res) => {
  return res.send("you are about to login!!!");
});

app.get("/logout", (req, res) => {
  return res.send("you are about to get logged out!!!");
});

app.listen(port, () => {
  console.log("Server is up and running ....");
});
