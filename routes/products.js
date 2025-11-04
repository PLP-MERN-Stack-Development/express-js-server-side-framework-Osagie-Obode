const express = require('express');
const { v4: uuidv4 } = require('uuid');
const products = require('../data/products');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const validateProduct = require('../middleware/validateProduct');

const router = express.Router();

// Helper to parse pagination params
function parsePagination(req) {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
  return { page, limit };
}

// GET /api/products - list with filtering, search, pagination
router.get('/', (req, res) => {
  const { category, q } = req.query;
  let result = products.slice();

  if (category) {
    result = result.filter(p => p.category === category);
  }

  if (q) {
    const lower = q.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(lower));
  }

  const { page, limit } = parsePagination(req);
  const total = result.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = result.slice(start, end);

  res.json({ meta: { total, page, limit, totalPages: Math.ceil(total / limit) }, data });
});

// GET /api/products/stats - count by category
router.get('/stats', (req, res) => {
  const stats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  res.json({ stats });
});

// GET /api/products/:id
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// POST /api/products
router.post('/', validateProduct(false), (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id
router.put('/:id', validateProduct(true), (req, res, next) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return next(new NotFoundError('Product not found'));
  const existing = products[idx];
  const updates = req.body;
  const updated = Object.assign({}, existing, updates);
  products[idx] = updated;
  res.json(updated);
});

// DELETE /api/products/:id
router.delete('/:id', (req, res, next) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return next(new NotFoundError('Product not found'));
  products.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;
