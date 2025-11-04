// server.js - Express server for Week 2 assignment

// Load .env if available (optional)
try {
  require('dotenv').config();
} catch (e) {
  // dotenv not installed — environment variables can still be provided by the host
}
const express = require('express');
const bodyParser = require('body-parser');
const ApiError = require('./errors/ApiError');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware
app.use(bodyParser.json());

// Custom middleware
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');

app.use(logger);

// Public root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Use /api/products for product operations.');
});

// API routes (protect /api with auth middleware)
app.use('/api', auth);
app.use('/api/products', require('./routes/products'));

// 404 handler for unknown routes
app.use((req, res, next) => {
  next(new ApiError(404, 'Resource not found'));
});

// Global error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;