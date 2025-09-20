'use client';

import React from 'react';
import { CartItem as CartItemType } from '@/contexts/CartContext';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleIncrement = () => {
    handleQuantityChange(item.quantity + 1);
  };

  const handleDecrement = () => {
    handleQuantityChange(item.quantity - 1);
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-50">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/96x96?text=No+Image';
            }}
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate mb-1">
          {item.name}
        </h3>
        <p className="text-lg font-bold text-black mb-3">
          {formatPrice(item.price)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleDecrement}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </button>
          
          <span className="text-lg font-semibold text-gray-900 min-w-[2rem] text-center">
            {item.quantity}
          </span>
          
          <button
            onClick={handleIncrement}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <div className="flex-shrink-0">
        <button
          onClick={() => onRemove(item.id)}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation group"
          aria-label="Remove item from cart"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 group-hover:text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
