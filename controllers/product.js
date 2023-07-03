const Product = require("../model/Product");
// Car add get Api
exports.add_product = (req, res, next) => {
  res.render("product/add", { title: "create product" });
};
// Car add post Api
exports.add_post = (req, res, next) => {
  const product = new Product({ ...req.body });
  product
    .save()
    .then((data) => {
      {
        res.redirect("/");
        res.send(data);
      }
    })
    .catch((err) => console.log(err));
};
// Car edit post api
exports.add_get = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("product/edit", { title: "Edit", product });
};
// car edit post function
exports.add_post_edit = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
// card delete post function
exports.add_delete = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
exports.admin = (req, res) => {
  res.render("admin/index", { title: "Dashboard" });
};
