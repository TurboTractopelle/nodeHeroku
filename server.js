const fs = require("fs");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  let now = new Date().toString();
  const logInfo = `${now}: ${req.method} -> ${req.url}`;
  console.log(logInfo);
  fs.appendFile("serverLog.txt", logInfo + "\n", err =>
    err ? console.log(err) : null
  );
  next();
});

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app
  .get("/", (req, res) => {
    res.render("home", { message: "gg" });
  })
  .get("/about", (req, res) => {
    res.render("home", { message: "ABOUUUUUUT" });
  })
  .get("/projects", (req, res) => {
    res.render("projects", { bodyMessage: "All project pages" });
  })
  .listen(port, () => console.log(`Listening on ${port}`));
