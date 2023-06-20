const User = require("../model/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
exports.register_post = async (req, res) => {
  const errors = validationResult(req);
  const hasError = !errors.isEmpty();
  if (hasError) {
    return res.render("register", { title: "Register", errors: errors.errors  });
  }
  try {
    const { email, password, name } = req.body;
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      console.log("Bu email ro'yhatdan o'tgan");
      return res.redirect("/register");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = new User({ name, password: hash, email });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};
