const mongoose = require("mongoose");
exports.connectDB = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/pug")
    .then(() => console.log("Mongodb ga ulanish hosil qilindi"))
    .catch((err) => {
      console.log("Malumot Bazasiga ulanishda hatolik bor");
      console.log(err);
      process.exit();
    });
};
