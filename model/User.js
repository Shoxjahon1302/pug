const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, requierd: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
