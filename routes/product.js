const express = require("express");
const {
  add_product,
  add_post,
  add_get,
  add_post_edit,
  add_delete,
} = require("../controllers/product");
const router = express.Router();
router.get("/add", add_product).post("/add", add_post);
router.get("/:id", add_get).post("/edit/:id", add_post_edit);
router.get("/delete/:id", add_delete);
module.exports = router;
