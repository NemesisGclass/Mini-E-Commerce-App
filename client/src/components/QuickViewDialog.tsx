'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { 
  X, Plus, Minus, ShoppingCart, Heart, Star, 
  Leaf, Shield, Truck, RotateCcw, Clock, Zap
} from 'lucide-react';

interface QuickViewDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewDialog: React.FC<QuickViewDialogProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      // Reset quantity when dialog opens
      setQuantity(1);
    } else {
      setIsAnimating(false);
      // Delay hiding to allow exit animation
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200';
  };

  const getProductRating = () => {
    return 4.5;
  };

  const getReviewCount = () => {
    return Math.floor(Math.random() * 100) + 20;
  };

  const getDiscountPercentage = () => {
    const discounts: { [key: string]: number } = {
      'apple': 15,
      'banana': 10,
      'strawberry': 20,
      'spinach': 5,
      'chicken': 12,
    };
    return discounts[product?.name.toLowerCase() || ''] || 0;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageGallery[0],
      });
    }
    onClose();
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 p-4 ${
      isAnimating ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className={`bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
        isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className={`flex justify-between items-start mb-4 sm:mb-6 transition-all duration-500 delay-100 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Quick View</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors hover:scale-110 transform duration-200 touch-manipulation"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {/* Product Images */}
            <div className={`space-y-4 transition-all duration-700 delay-200 ${
              isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              {/* Main Image */}
              <div className="relative group">
                <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-lg">
                  <img
                    src={product.imageGallery[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                    }}
                  />
                </div>
                
                {/* Discount Badge */}
                {getDiscountPercentage() > 0 && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    -{getDiscountPercentage()}%
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {product.imageGallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.imageGallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                        selectedImageIndex === index 
                          ? 'border-black shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover transition-all duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className={`space-y-6 transition-all duration-700 delay-300 ${
              isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              {/* Category and Badges */}
              <div className="flex items-center space-x-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 delay-400 ${
                  isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } ${getCategoryColor(product.category)}`}>
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
                {product.stockQuantity === 0 && (
                  <span className={`bg-black text-white px-3 py-1 rounded-full text-sm font-medium transition-all duration-500 delay-500 ${
                    isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}>
                    Out of Stock
                  </span>
                )}
                {product.stockQuantity < 10 && product.stockQuantity > 0 && (
                  <span className={`bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium transition-all duration-500 delay-500 ${
                    isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}>
                    Low Stock
                  </span>
                )}
              </div>

              {/* Product Title */}
              <h1 className={`text-2xl sm:text-3xl font-bold text-gray-900 leading-tight transition-all duration-600 delay-600 ${
                isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>{product.name}</h1>
              
              {/* Rating and Reviews */}
              <div className={`flex items-center space-x-4 transition-all duration-600 delay-700 ${
                isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 delay-${800 + i * 100} ${
                        i < Math.floor(getProductRating())
                          ? 'text-gray-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-base sm:text-lg font-semibold text-gray-900 ml-2">{getProductRating()}</span>
                </div>
                <span className="text-gray-500 text-sm sm:text-base">({getReviewCount()} reviews)</span>
              </div>

              {/* Price Section */}
              <div className={`space-y-2 transition-all duration-600 delay-800 ${
                isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl sm:text-3xl font-bold text-black">{formatPrice(product.price)}</span>
                  {getDiscountPercentage() > 0 && (
                    <span className="text-lg sm:text-xl text-gray-500 line-through">
                      {formatPrice(product.price / (1 - getDiscountPercentage() / 100))}
                    </span>
                  )}
                </div>
                {getDiscountPercentage() > 0 && (
                  <p className="text-black font-medium text-sm sm:text-base">You save {formatPrice(product.price * getDiscountPercentage() / 100)}!</p>
                )}
              </div>

              {/* Description */}
              <p className={`text-gray-700 text-base sm:text-lg leading-relaxed transition-all duration-600 delay-600 ${
                isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>{product.description}</p>

              {/* Key Features */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 transition-all duration-600 delay-700 ${
                isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform">
                  <Leaf className="w-5 h-5 text-black" />
                  <span className="text-sm font-medium text-black">Organic Certified</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform">
                  <Shield className="w-5 h-5 text-black" />
                  <span className="text-sm font-medium text-black">Quality Guaranteed</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform">
                  <Truck className="w-5 h-5 text-black" />
                  <span className="text-sm font-medium text-black">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform">
                  <RotateCcw className="w-5 h-5 text-black" />
                  <span className="text-sm font-medium text-black">Easy Returns</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className={`space-y-3 transition-all duration-600 delay-900 ${
                isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 transform touch-manipulation"
                  >
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="text-lg sm:text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 transform touch-manipulation"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`space-y-4 transition-all duration-600 delay-1000 ${
                isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stockQuantity === 0}
                    className="flex-1 bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center hover:scale-105 transform touch-manipulation"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={toggleWishlist}
                    className={`w-full sm:w-14 h-12 sm:h-14 border-2 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 transform touch-manipulation ${
                      isWishlisted
                        ? 'border-black bg-gray-50 text-black'
                        : 'border-gray-300 hover:border-black hover:text-black'
                    }`}
                  >
                    <Heart className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                      isWishlisted ? 'fill-current scale-110' : ''
                    }`} />
                  </button>
                </div>
              </div>

              {/* Stock and Shipping Info */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  <span className="text-xs sm:text-sm text-gray-700">
                    {product.stockQuantity > 0 
                      ? `${product.stockQuantity} items in stock`
                      : 'Currently out of stock'
                    }
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  <span className="text-xs sm:text-sm text-gray-700">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                  <span className="text-xs sm:text-sm text-gray-700">30-day money-back guarantee</span>
                </div>
              </div>

              {/* Nutrition Facts Preview */}
              {product.nutritionFacts && (
                <div className={`bg-white border border-gray-200 rounded-lg p-4 transition-all duration-600 delay-1100 ${
                  isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Facts</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black">{product.nutritionFacts.calories}</div>
                      <div className="text-sm text-gray-600">Calories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black">{product.nutritionFacts.protein}g</div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black">{product.nutritionFacts.carbohydrates}g</div>
                      <div className="text-sm text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-black">{product.nutritionFacts.fat}g</div>
                      <div className="text-sm text-gray-600">Fat</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewDialog;
