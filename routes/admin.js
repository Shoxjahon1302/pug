const express = require("express");
const router = express.Router();
const Product = require("../model/Product");
const isAdmin = require("../middleware/isAdmin");
router.get("/", isAdmin, async (req, res) => {
  const products = await Product.find();
  res.render("admin/index", {
    title: "Dashboard",
    activePage: "dashboard",
    products,
  });
});
router.get("/", (req, res) => {
  res.render("admin/components/navbar", {
    title: "Dashboard",
    
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
