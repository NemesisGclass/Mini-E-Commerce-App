const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['fruits', 'vegetables', 'dairy', 'meat', 'grains', 'beverages', 'snacks', 'frozen', 'bakery', 'other']
  },
  imageGallery: [{
    type: String,
    required: true
  }],
  nutritionFacts: {
    calories: { type: Number, min: 0 },
    protein: { type: Number, min: 0 },
    carbohydrates: { type: Number, min: 0 },
    fat: { type: Number, min: 0 },
    fiber: { type: Number, min: 0 },
    sugar: { type: Number, min: 0 },
    sodium: { type: Number, min: 0 },
    servingSize: String
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
