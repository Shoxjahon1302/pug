const express = require("express");
const { register_post } = require("../controllers/user");
const router = express.Router();
router.get("/login", (req, res, next) => {
  res.render("login", { title: "Login" });
});
router.get("/register", (req, res, next) => {
  res.render("register", { title: "Register" });
});
router.post("/register", register_post);
module.exports = router;      