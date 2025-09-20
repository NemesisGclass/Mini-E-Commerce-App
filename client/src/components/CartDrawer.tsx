'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import CartItem from './CartItem';
import { X, ShoppingCart, Truck, CreditCard } from 'lucide-react';

const CartDrawer: React.FC = () => {
  const router = useRouter();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getSubtotal,
    getShippingCost,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      // Prevent body scroll when cart is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      // Restore body scroll
      document.body.style.overflow = 'unset';
      // Delay hiding to allow exit animation
      setTimeout(() => setIsVisible(false), 400);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/cart');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsCartOpen(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 animate-backdrop-fade" />
      
      {/* Cart Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-96 lg:w-[28rem] bg-white shadow-2xl transform transition-all duration-400 ease-in-out ${
          isAnimating ? 'translate-x-0 animate-slide-in-right' : 'translate-x-full animate-slide-out-right'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-900">
                Shopping Cart
              </h2>
              {getTotalItems() > 0 && (
                <span className="bg-black text-white rounded-full px-2 py-1 text-sm font-semibold">
                  {getTotalItems()}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mb-6 max-w-sm">
                  Add some items to get started with your shopping
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              /* Cart Items */
              <div className="p-4 sm:p-6 space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CartItem
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Only show when cart has items */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 bg-white p-4 sm:p-6 space-y-4">
              {/* Order Summary */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(getSubtotal())}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Shipping</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {getShippingCost() === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      formatPrice(getShippingCost())
                    )}
                  </span>
                </div>

                {getSubtotal() < 50 && (
                  <div className="text-sm text-gray-500 text-center py-2 bg-gray-50 rounded-lg">
                    Add {formatPrice(50 - getSubtotal())} more for free shipping!
                  </div>
                )}

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-black">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Proceed to Checkout</span>
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
