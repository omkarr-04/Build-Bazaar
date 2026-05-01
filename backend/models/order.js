const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, default: "" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.Mixed, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
      image: String,
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "shipped", "delivered"],
    default: "completed",
  },
  payment: {
    method: { type: String, default: "UPI" },
    status: { type: String, enum: ["pending", "completed"], default: "completed" },
    transactionId: { type: String, default: "" },
  },
  shipping: {
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    pincode: { type: String, default: "" },
    status: { type: String, default: "pending" },
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
