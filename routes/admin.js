const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("/admin/index", { title: "Dashboard" });
});

module.exports = router;