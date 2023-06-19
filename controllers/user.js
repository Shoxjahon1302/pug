const User = require("../model/User");
const bcrypt = require("bcrypt");
exports.register_post = async (req, res) => {
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
