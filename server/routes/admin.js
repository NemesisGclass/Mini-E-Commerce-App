const router = require('express').Router();
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Middleware to verify admin token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all products (admin)
router.get('/products', verifyToken, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch(err) { res.status(500).json(err); }
});

// Add new product (admin)
router.post('/products', verifyToken, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch(err) { res.status(500).json(err); }
});

// Update product (admin)
router.put('/products/:id', verifyToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch(err) { res.status(500).json(err); }
});

// Delete product (admin)
router.delete('/products/:id', verifyToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch(err) { res.status(500).json(err); }
});

module.exports = router;
