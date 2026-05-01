const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

const calculateCartTotal = (items) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);

const getPopulatedCart = async (userId) => {
  return Cart.findOne({ userId }).populate("items.productId");
};

router.get("/", authenticateToken, async (req, res) => {
  try {
    const cart = await getPopulatedCart(req.user.userId);
    res.json(cart || { items: [], total: 0 });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const qty = Number(quantity);

    if (!productId) {
      return res.status(400).json({ error: "productId is required" });
    }

    if (!Number.isFinite(qty) || qty < 1) {
      return res.status(400).json({ error: "quantity must be at least 1" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [], total: 0 });
    }

    const existingItem = cart.items.find(
      (item) => String(item.productId) === String(productId),
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        quantity: qty,
        image: product.imageUrl || "",
      });
    }

    cart.total = calculateCartTotal(cart.items);
    await cart.save();

    const populatedCart = await getPopulatedCart(req.user.userId);
    res.json(populatedCart || { items: [], total: 0 });
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    res.status(500).json({ error: "Failed to add item" });
  }
});

router.delete("/remove/:productId", authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => String(item.productId) !== String(productId));
    cart.total = calculateCartTotal(cart.items);
    await cart.save();

    const populatedCart = await getPopulatedCart(req.user.userId);
    res.json(populatedCart || { items: [], total: 0 });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item" });
  }
});

router.put("/update", authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const qty = Number(quantity);
    const cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if (!Number.isFinite(qty) || qty < 1) {
      return res.status(400).json({ error: "quantity must be at least 1" });
    }

    const item = cart.items.find((entry) => String(entry.productId) === String(productId));
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.quantity = qty;
    cart.total = calculateCartTotal(cart.items);
    await cart.save();

    const populatedCart = await getPopulatedCart(req.user.userId);
    res.json(populatedCart || { items: [], total: 0 });
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
});

router.delete("/clear", authenticateToken, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.userId });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

module.exports = router;
