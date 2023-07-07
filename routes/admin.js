const express = require("express");
const router = express.Router();
const Product = require("../model/Product");
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.render("admin/index", {
    title: "Dashboard",
    activePage: "dashboard",
    products,
  });
});
router.get("/product", async (req, res) => {
  const productCount = await Product.find().countDocuments();
  res.render("admin/pages/product/index", {
    title: "Products",
    activePage: "product",
    productCount,
  });
});
module.exports = router;
