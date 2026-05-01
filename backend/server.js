require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const aiChatRoutes = require("./routes/aiChat");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/buildbazaar', {
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use("/api/ai-chat", aiChatRoutes);

// Placeholder image route
app.get('/api/placeholder/:width/:height/:bg/:fg', (req, res) => {
  const { width, height, bg, fg } = req.params;
  const text = req.query.text || 'Placeholder';

  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#${bg}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#${fg}" text-anchor="middle" dy=".3em">${decodeURIComponent(text)}</text>
    </svg>
  `;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
