const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../model/User");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // username
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, {
              type: "danger",
              message: "Emailda Xatolik bor",
            });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            done(null, user);
          } else {
            done(null, false, { type: "danger", message: "Parol xato" });
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
