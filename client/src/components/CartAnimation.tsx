'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';

interface CartAnimationProps {
  isAnimating: boolean;
  onComplete: () => void;
  productImage: string;
  productName: string;
}

const CartAnimation: React.FC<CartAnimationProps> = ({ 
  isAnimating, 
  onComplete, 
  productImage, 
  productName 
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      // Show success notification after animation
      const timer = setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onComplete();
        }, 2000);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isAnimating, onComplete]);

  if (!isAnimating && !showSuccess) return null;

  return (
    <>
      {/* Flying Product Animation */}
      {isAnimating && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-fly-to-cart">
              <img
                src={productImage}
                alt={productName}
                className="w-12 h-12 object-cover rounded-full shadow-lg border-2 border-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in">
          <div className="bg-black text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-sm">
            <div className="bg-white text-black rounded-full p-1">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold">Added to Cart!</p>
              <p className="text-sm opacity-90">{productName}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartAnimation;
