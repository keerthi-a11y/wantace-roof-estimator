const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const estimateRoutes = require('./routes/estimateRoutes');
const questionRoutes = require('./routes/questionRoutes');
const authRoutes = require('./routes/authRoutes');
const ownerPricingRoutes = require('./routes/ownerPricingRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/estimate', estimateRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/owner/pricing', ownerPricingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Northline Roofing API is running',
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log('MongoDB connected successfully');

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });