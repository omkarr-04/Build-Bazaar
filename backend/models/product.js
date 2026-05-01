const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  verified: { type: Boolean, default: true },
  helpful: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  brand: { type: String, default: "" },
  category: { type: String, default: "" },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
  compatibility: { type: mongoose.Schema.Types.Mixed, default: {} },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: [reviewSchema],
  imageUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
