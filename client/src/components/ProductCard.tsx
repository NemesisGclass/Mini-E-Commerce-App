'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import CartAnimation from './CartAnimation';
import QuickViewDialog from './QuickViewDialog';
import { ShoppingCart, Eye, Star, Zap, TrendingUp, Clock } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      fruits: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200',
      vegetables: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200',
      dairy: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200',
      meat: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200',
      grains: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200',
      beverages: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200',
      snacks: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200',
      frozen: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200',
      bakery: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200',
      other: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-200',
    };
    return colors[category] || colors.other;
  };

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.imageGallery[0],
    });
    
    // Trigger animation
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };


  const getDiscountPercentage = () => {
    // Simulate discount for demo purposes
    const discounts: { [key: string]: number } = {
      'apple': 15,
      'banana': 10,
      'orange': 20,
      'strawberry': 25,
    };
    return discounts[product.name.toLowerCase()] || 0;
  };

  const getRating = () => {
    // Simulate rating for demo purposes
    const ratings: { [key: string]: number } = {
      'apple': 4.5,
      'banana': 4.2,
      'orange': 4.7,
      'strawberry': 4.8,
    };
    return ratings[product.name.toLowerCase()] || 4.0;
  };

  const discountPercentage = getDiscountPercentage();
  const rating = getRating();
  const originalPrice = discountPercentage > 0 ? product.price / (1 - discountPercentage / 100) : product.price;

  return (
    <div 
      className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-gray-300 touch-manipulation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <Link href={`/products/${product._id}`}>
          <img
            src={product.imageGallery[currentImageIndex]}
            alt={product.name}
            className="w-full h-40 sm:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        </Link>
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
            -{discountPercentage}%
          </div>
        )}
        
        
        {/* Mobile Add to Cart Button - Always Visible */}
        <div className="absolute top-2 right-2 sm:hidden">
          <button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className="bg-black text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-2 transition-opacity duration-300 hidden sm:flex ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={() => setIsQuickViewOpen(true)}
            className="bg-white text-gray-800 p-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-110 touch-manipulation"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
        
        {/* Rating Overlay - Desktop Only */}
        <div className={`absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full transition-all duration-300 hidden sm:block ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(rating) 
                      ? 'text-gray-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 font-medium">({rating})</span>
          </div>
        </div>
        
        {/* Image Gallery Dots */}
        {product.imageGallery.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product.imageGallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Category and Stock */}
        <div className="flex justify-between items-center mb-2">
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span className="hidden sm:inline">{product.stockQuantity} left</span>
            <span className="sm:hidden">{product.stockQuantity}</span>
          </div>
        </div>
        
        {/* Product Name */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 group-hover:text-black transition-colors line-clamp-2">
          <Link href={`/products/${product._id}`}>
            {product.name}
          </Link>
        </h3>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg sm:text-xl font-bold text-black">{formatPrice(product.price)}</span>
            {discountPercentage > 0 && (
              <span className="text-xs text-gray-500 line-through">{formatPrice(originalPrice)}</span>
            )}
          </div>
          {product.stockQuantity < 10 && product.stockQuantity > 0 && (
            <div className="flex items-center text-gray-600 text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>Low Stock</span>
            </div>
          )}
        </div>

        {/* Stock Status */}
        {product.stockQuantity === 0 && (
          <div className="mt-2 text-center">
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      {/* Quick View Dialog */}
      <QuickViewDialog
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
      
      {/* Cart Animation */}
      <CartAnimation
        isAnimating={isAnimating}
        onComplete={handleAnimationComplete}
        productImage={product.imageGallery[0]}
        productName={product.name}
      />
    </div>
  );
};

export default ProductCard;
