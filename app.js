const createError = require("http-errors");
const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db").connectDB();
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
// const flash = require("connect-flash");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const ProductRouter = require("./routes/product");
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
// flash xatolik chiqarib berish
app.use(require("connect-flash")());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});
// Password
const passport = require("passport");
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Global router
app.get("*", (req, res, next) => {
  if (req.user) {
    const { password, ...user } = req.user._doc;
    res.locals.user = JSON.stringify(user);
    console.log(user);
  } else {
    res.locals.user = null;
  }
  next();
});

app.use((req, res, next) => {
  req.session.lang = req.query.lang || req.session.lang || "uz";
  const file = `./config/lang/${req.session.lang}.json`;
  fs.readFile(file, (err, data) => {
    if (err) res.send("Error loading language file:" + file);
    else {
      l = JSON.parse(data);
      lang = req.session.lang;
      next();
    }
  });
});
app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/product", ProductRouter);
app.use("/admin", require("./routes/admin"));
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
