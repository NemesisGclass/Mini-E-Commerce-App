'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Plus, Minus, Trash2, Truck, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const CartDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, getSubtotal, getShippingCost, clearCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for cart changes to trigger bounce
  useEffect(() => {
    if (cartItems.length > 0) {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 600);
    }
  }, [cartItems.length]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  // Close dropdown when mouse leaves the component with delay
  useEffect(() => {
    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 300); // 300ms delay
    };

    const handleMouseEnter = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const element = dropdownRef.current;
    if (element) {
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('mouseenter', handleMouseEnter);
      return () => {
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('mouseenter', handleMouseEnter);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Button */}
      <button
        onMouseEnter={() => setIsOpen(true)}
        onClick={handleCartClick}
        className={`relative text-gray-700 hover:text-black px-2 md:px-4 py-3 rounded-md font-medium transition-all duration-300 hover:bg-gray-100 flex items-center cursor-pointer ${
          isScrolled ? 'text-sm' : 'text-base'
        } ${isBouncing ? 'animate-cart-bounce' : ''}`}
      >
        <ShoppingCart className={`${isScrolled ? 'w-4 h-4' : 'w-5 h-5'} md:mr-2`} />
        <span className="hidden md:inline">Cart</span>
        {getTotalItems() > 0 && (
          <span className={`absolute -top-1 -right-1 bg-black text-white rounded-full flex items-center justify-center transition-all duration-300 ${
            isScrolled ? 'text-xs h-4 w-4' : 'text-sm h-5 w-5'
          }`}>
            {getTotalItems()}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[80vh] overflow-hidden">
          <div className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Shopping Cart</h3>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-80 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2 sm:space-x-3 py-2 border-b border-gray-100 last:border-b-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md flex-shrink-0"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/48x48?text=No+Image';
                        }}
                      />
                      
                      <div className="flex-grow min-w-0">
                        <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-xs sm:text-sm text-primary-600 font-medium">{formatPrice(item.price)}</p>
                      </div>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 sm:w-6 sm:h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 touch-manipulation"
                        >
                          <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                        </button>
                        <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 sm:w-6 sm:h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 touch-manipulation"
                        >
                          <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-black hover:text-gray-700 p-1 touch-manipulation"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-3 mt-3 space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Subtotal</span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {formatPrice(getSubtotal())}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1">
                        <Truck className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-600 text-sm">Shipping</span>
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">
                        {getShippingCost() === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          formatPrice(getShippingCost())
                        )}
                      </span>
                    </div>

                    {getSubtotal() < 50 && (
                      <div className="text-xs text-gray-500 text-center py-1 bg-gray-50 rounded">
                        Add {formatPrice(50 - getSubtotal())} more for free shipping!
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-900">Total</span>
                        <span className="text-sm font-bold text-black">
                          {formatPrice(getTotalPrice())}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Link
                      href="/cart"
                      className="block w-full text-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Proceed to Checkout</span>
                    </Link>
                    
                    <button
                      onClick={clearCart}
                      className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
