const express = require("express");
const { register_post } = require("../controllers/user");
const { check } = require("express-validator");
const passport = require("passport");
const router = express.Router();
router.get("/login", (req, res, next) => {
  res.render("login", { title: "Login" });
});
router.get("/register", (req, res, next) => {
  res.render("register", { title: "Register" });
});
router.post(
  "/register",
  [
    check("name")
      .isLength({ min: 6, max: 13 })
      .not()
      .trim()
      .withMessage("Ism Noto'g'ri"),
    check("email").isEmail().not().withMessage("Noto'g'ri Email"),
    check("password")
      .isLength({ min: 8, max: 20 })
      .withMessage("Parol Noto'g'ri")
      .matches(/\d/)
      .withMessage("Murakkab Parol o'ylab toping!")
      .matches(/[@#$%^&*()]/)
      .withMessage("Belgilardan Foydalaning"),
    check("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          return false;
        }
        return true;
      })
      .withMessage("Qayta kiritilgan parol xato"),
  ],
  register_post
);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});
module.exports = router;
