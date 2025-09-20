'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import { X, Upload, Plus, Trash2 } from 'lucide-react';

interface ProductFormProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: any) => void;
  loading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, isOpen, onClose, onSave, loading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    imageGallery: [''],
    nutritionFacts: {
      calories: '',
      protein: '',
      carbohydrates: '',
      fat: '',
      fiber: '',
      sugar: '',
      sodium: '',
      servingSize: ''
    }
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = [
    'fruits', 'vegetables', 'dairy', 'meat', 'grains', 
    'beverages', 'snacks', 'frozen', 'bakery', 'other'
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || '',
        stockQuantity: product.stockQuantity?.toString() || '',
        imageGallery: product.imageGallery?.length > 0 ? product.imageGallery : [''],
        nutritionFacts: {
          calories: product.nutritionFacts?.calories?.toString() || '',
          protein: product.nutritionFacts?.protein?.toString() || '',
          carbohydrates: product.nutritionFacts?.carbohydrates?.toString() || '',
          fat: product.nutritionFacts?.fat?.toString() || '',
          fiber: product.nutritionFacts?.fiber?.toString() || '',
          sugar: product.nutritionFacts?.sugar?.toString() || '',
          sodium: product.nutritionFacts?.sodium?.toString() || '',
          servingSize: product.nutritionFacts?.servingSize || ''
        }
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stockQuantity: '',
        imageGallery: [''],
        nutritionFacts: {
          calories: '',
          protein: '',
          carbohydrates: '',
          fat: '',
          fiber: '',
          sugar: '',
          sodium: '',
          servingSize: ''
        }
      });
    }
    setErrors({});
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('nutritionFacts.')) {
      const nutritionField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        nutritionFacts: {
          ...prev.nutritionFacts,
          [nutritionField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImageGallery = [...formData.imageGallery];
    newImageGallery[index] = value;
    setFormData(prev => ({
      ...prev,
      imageGallery: newImageGallery
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      imageGallery: [...prev.imageGallery, '']
    }));
  };

  const removeImageField = (index: number) => {
    if (formData.imageGallery.length > 1) {
      const newImageGallery = formData.imageGallery.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        imageGallery: newImageGallery
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.stockQuantity || parseInt(formData.stockQuantity) < 0) newErrors.stockQuantity = 'Valid stock quantity is required';
    
    // Check if at least one image URL is provided
    const hasValidImage = formData.imageGallery.some(url => url.trim() !== '');
    if (!hasValidImage) newErrors.imageGallery = 'At least one image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stockQuantity: parseInt(formData.stockQuantity),
      imageGallery: formData.imageGallery.filter(url => url.trim() !== ''),
      nutritionFacts: {
        calories: parseFloat(formData.nutritionFacts.calories) || 0,
        protein: parseFloat(formData.nutritionFacts.protein) || 0,
        carbohydrates: parseFloat(formData.nutritionFacts.carbohydrates) || 0,
        fat: parseFloat(formData.nutritionFacts.fat) || 0,
        fiber: parseFloat(formData.nutritionFacts.fiber) || 0,
        sugar: parseFloat(formData.nutritionFacts.sugar) || 0,
        sodium: parseFloat(formData.nutritionFacts.sodium) || 0,
        servingSize: formData.nutritionFacts.servingSize
      }
    };

    onSave(productData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input ${errors.name ? 'border-black' : ''}`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-black text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`input ${errors.category ? 'border-black' : ''}`}
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-black text-sm mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`input ${errors.price ? 'border-black' : ''}`}
                placeholder="0.00"
              />
              {errors.price && <p className="text-black text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                className={`input ${errors.stockQuantity ? 'border-black' : ''}`}
                placeholder="0"
              />
              {errors.stockQuantity && <p className="text-black text-sm mt-1">{errors.stockQuantity}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`input ${errors.description ? 'border-black' : ''}`}
              placeholder="Enter product description"
            />
            {errors.description && <p className="text-black text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Image Gallery */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images *
            </label>
            {formData.imageGallery.map((url, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="input flex-1"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.imageGallery.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="text-black hover:text-gray-700 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="flex items-center text-black hover:text-gray-800 text-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add another image
            </button>
            {errors.imageGallery && <p className="text-black text-sm mt-1">{errors.imageGallery}</p>}
          </div>

          {/* Nutrition Facts */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Facts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calories</label>
                <input
                  type="number"
                  name="nutritionFacts.calories"
                  value={formData.nutritionFacts.calories}
                  onChange={handleChange}
                  className="input"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Protein (g)</label>
                <input
                  type="number"
                  step="0.1"
                  name="nutritionFacts.protein"
                  value={formData.nutritionFacts.protein}
                  onChange={handleChange}
                  className="input"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carbs (g)</label>
                <input
                  type="number"
                  step="0.1"
                  name="nutritionFacts.carbohydrates"
                  value={formData.nutritionFacts.carbohydrates}
                  onChange={handleChange}
                  className="input"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fat (g)</label>
                <input
                  type="number"
                  step="0.1"
                  name="nutritionFacts.fat"
                  value={formData.nutritionFacts.fat}
                  onChange={handleChange}
                  className="input"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fiber (g)</label>
                <input
                  type="number"
                  step="0.1"
                  name="nutritionFacts.fiber"
                  value={formData.nutritionFacts.fiber}
                  onChange={handleChange}
                  className="input"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sugar (g)</label>
                <input
                  type="number"
                  step="0.1"
                  name="nutritionFacts.sugar"
                  value={formData.nutritionFacts.sugar}
                  onChange={handleChange}
                  className="input"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sodium (mg)</label>
                <input
                  type="number"
                  name="nutritionFacts.sodium"
                  value={formData.nutritionFacts.sodium}
                  onChange={handleChange}
                  className="input"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Serving Size</label>
                <input
                  type="text"
                  name="nutritionFacts.servingSize"
                  value={formData.nutritionFacts.servingSize}
                  onChange={handleChange}
                  className="input"
                  placeholder="1 cup"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center"
            >
              {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
