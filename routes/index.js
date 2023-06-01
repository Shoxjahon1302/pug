const express = require('express');
const Product = require('../model/Product');
const router = express.Router();
router.get('/', async (req, res, next) => {
  const cars = await Product.find({});
  res.render('index', { title: 'Express', cars });
});
module.exports = router;
