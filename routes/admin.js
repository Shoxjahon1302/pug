const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("admin/index", { title: "Dashboard" });
});
router.get("/product", (req, res) => {
  res.render("admin/pages/product/index", { title: "Products" });
});
module.exports = router;
