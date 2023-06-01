const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, default: 0 },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Product', ProductSchema);
