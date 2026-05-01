const express = require("express");
const authenticateToken = require("../middleware/auth");
const Cart = require("../models/cart.js");
const Order = require("../models/order.js");
const User = require("../models/user.js");

const router = express.Router();

const mapOrderItem = (item = {}) => {
  const rawProductId = item.productId?._id || item.productId || item._id;
  const name = item.name || item.productId?.name;
  const price = Number(item.price);
  const quantity = Number(item.quantity) || 1;

  if (!rawProductId || !name || !Number.isFinite(price) || price < 0 || quantity < 1) {
    return null;
  }

  return {
    productId: rawProductId,
    name: String(name),
    price,
    quantity,
    image: item.image || item.productId?.image || item.productId?.imageUrl || "",
  };
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

router.post("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(userId).select("name");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const cart = await Cart.findOne({ userId });
    const requestItems = Array.isArray(req.body?.items) ? req.body.items : [];
    const sourceItems = requestItems.length > 0 ? requestItems : (cart?.items || []);

    if (sourceItems.length === 0) {
      return res.status(400).json({ error: "No items found for order" });
    }

    const items = sourceItems.map(mapOrderItem).filter(Boolean);

    if (items.length === 0) {
      return res.status(400).json({ error: "No valid items found for order" });
    }

    const total = calculateTotal(items);
    const transactionId = "TXN" + Date.now() + Math.floor(Math.random() * 1000);

    const shipping = {
      address: req.body?.shipping?.address || "",
      city: req.body?.shipping?.city || "",
      state: req.body?.shipping?.state || "",
      pincode: req.body?.shipping?.pincode || "",
      status: "pending",
    };

    const payment = {
      method: "UPI",
      status: "completed",
      transactionId,
    };

    const order = new Order({
      userId: user._id,
      userName: user.name || "",
      items,
      total,
      payment,
      shipping,
      status: "completed",
    });

    await order.save();
    if (cart) {
      await Cart.findOneAndDelete({ userId });
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id,
      transactionId: transactionId,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ error: "Order placement failed" });
  }
});

router.get("/my", authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
