const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    next();
  } else {
    req.flash("danger", "Sizga Ruhsat berilmagan");
    res.redirect("/");
  }
};
module.exports = isAdmin;
