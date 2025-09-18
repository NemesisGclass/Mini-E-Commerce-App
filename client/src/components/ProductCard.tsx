'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

  const addToCart = () => {
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((item: any) => item.id === product._id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.imageGallery[0],
          quantity: 1
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`Added ${product.name} to cart!`);
    }
  };

  return (
    <div className="card">
      <Link href={`/products/${product._id}`}>
        <img
          src={product.imageGallery[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
      </Link>
      
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
          {product.stockQuantity === 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          <Link href={`/products/${product._id}`} className="hover:text-primary-600 transition-colors">
            {product.name}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-primary-600">{formatPrice(product.price)}</span>
          <span className="text-sm text-gray-500">{product.stockQuantity} in stock</span>
        </div>

        <div className="flex space-x-2">
          <Link
            href={`/products/${product._id}`}
            className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-md hover:bg-primary-700 transition-colors text-sm font-medium flex items-center justify-center"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Link>
          <button
            onClick={addToCart}
            disabled={product.stockQuantity === 0}
            className="bg-secondary-600 text-white px-4 py-2 rounded-md hover:bg-secondary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
