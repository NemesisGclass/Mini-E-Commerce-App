const router = require('express').Router();
const Product = require('../models/Product');
const { verifyAdmin } = require('../middleware/auth');

// Get all products (admin)
router.get('/products', verifyAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      data: products
    });
  } catch(err) { 
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: err.message
    }); 
  }
});

// Add new product (admin)
router.post('/products', verifyAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch(err) { 
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: err.message
    }); 
  }
});

// Update product (admin)
router.put('/products/:id', verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ 
      success: false,
      message: 'Product not found' 
    });
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch(err) { 
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: err.message
    }); 
  }
});

// Delete product (admin)
router.delete('/products/:id', verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ 
      success: false,
      message: 'Product not found' 
    });
    res.json({ 
      success: true,
      message: 'Product deleted successfully' 
    });
  } catch(err) { 
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: err.message
    }); 
  }
});

module.exports = router;
