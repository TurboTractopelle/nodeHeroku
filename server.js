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

app.use((req, res, next) =>
  res.render("maintenance", { endDate: "01 / 02 / 19" })
);

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app
  .get("/", (req, res) => {
    res.render("home", { message: "gg" });
  })
  .get("/about", (req, res) => {
    res.render("home", { message: "ABOUUUUUUT" });
  })
  .listen(port, () => console.log(`Listening on ${port}`));
