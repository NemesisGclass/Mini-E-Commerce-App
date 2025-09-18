'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { productsAPI } from '@/lib/api';
import { Product } from '@/types';
import { ArrowLeft, Plus, Minus, ShoppingCart, Heart } from 'lucide-react';

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await productsAPI.getById(id);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product._id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageGallery[0],
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      fruits: 'bg-red-100 text-red-800',
      vegetables: 'bg-green-100 text-green-800',
      dairy: 'bg-blue-100 text-blue-800',
      meat: 'bg-orange-100 text-orange-800',
      grains: 'bg-yellow-100 text-yellow-800',
      beverages: 'bg-purple-100 text-purple-800',
      snacks: 'bg-pink-100 text-pink-800',
      frozen: 'bg-cyan-100 text-cyan-800',
      bakery: 'bg-amber-100 text-amber-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.other;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Product not found'}</p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/" className="text-primary-600 hover:text-primary-500 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Products
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.imageGallery[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
            </div>
            
            {product.imageGallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.imageGallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-full h-20 object-cover rounded-md border-2 ${
                      selectedImageIndex === index ? 'border-primary-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/100x80?text=No+Image';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(product.category)}`}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
              {product.stockQuantity === 0 && (
                <span className="ml-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-bold text-primary-600 mb-6">{formatPrice(product.price)}</p>
            
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={addToCart}
                disabled={product.stockQuantity === 0}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Stock Info */}
            <p className="text-sm text-gray-600">
              {product.stockQuantity > 0 
                ? `${product.stockQuantity} items in stock`
                : 'Currently out of stock'
              }
            </p>
          </div>
        </div>

        {/* Nutrition Facts */}
        {product.nutritionFacts && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nutrition Facts</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{product.nutritionFacts.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{product.nutritionFacts.protein}g</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{product.nutritionFacts.carbohydrates}g</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{product.nutritionFacts.fat}g</div>
                  <div className="text-sm text-gray-600">Fat</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>Serving Size:</strong> {product.nutritionFacts.servingSize}</p>
                <p><strong>Fiber:</strong> {product.nutritionFacts.fiber}g</p>
                <p><strong>Sugar:</strong> {product.nutritionFacts.sugar}g</p>
                <p><strong>Sodium:</strong> {product.nutritionFacts.sodium}mg</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
