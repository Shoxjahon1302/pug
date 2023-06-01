const createError = require('http-errors');
const express = require('express');
require('dotenv').config();
require('./config/db').connectDB();
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ProductRouter = require('./routes/product');
const app = express();
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  if (!req.session.lang) req.session.lang = 'uz';
  if (req.query.lang) req.session.lang = req.query.lang;
  const file = `./config/lang/${req.session.lang}.json`;
  fs.readFile(file, (err, data) => {
    if (err) res.send('Error loading language file:' + file);
    else {
      l = JSON.parse(data);
      lang = req.session.lang;
      next();
    }
  });
});
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/product', ProductRouter); 
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
