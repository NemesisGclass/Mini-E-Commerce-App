'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import CartDropdown from './CartDropdown';
import { Menu, X, User, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems, cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className={`bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2 shadow-xl backdrop-blur-sm bg-white/95' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center w-12 justify-start">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`text-gray-700 hover:text-black p-3 transition-all duration-300 ${
                isScrolled ? 'text-lg' : 'text-xl'
              }`}
            >
              <div className={`w-6 h-6 transition-all duration-300 ${
                isMenuOpen ? 'rotate-180' : ''
              }`}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </div>
            </button>
          </div>

          {/* Centered Logo */}
          <div className="flex-1 flex items-center justify-center">
            <Link href="/" className="flex items-center">
              <span className={`font-bold text-gray-900 font-dynapuff transition-all duration-300 ${
                isScrolled ? 'text-2xl' : 'text-3xl'
              }`}>FreshMarket</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-gray-700 hover:text-black px-4 py-3 rounded-md font-medium transition-all duration-300 hover:bg-gray-100 ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}
            >
              Products
            </Link>
            <Link
              href="/blogs"
              className={`text-gray-700 hover:text-black px-4 py-3 rounded-md font-medium transition-all duration-300 hover:bg-gray-100 ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`text-gray-700 hover:text-black px-4 py-3 rounded-md font-medium transition-all duration-300 hover:bg-gray-100 ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-gray-700 hover:text-black px-4 py-3 rounded-md font-medium transition-all duration-300 hover:bg-gray-100 ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}
            >
              Contact
            </Link>
            <CartDropdown />
            {isAuthenticated && user?.role === 'admin' && (
              <Link
                href="/admin"
                className={`text-gray-700 hover:text-black px-4 py-3 rounded-md font-medium transition-all duration-300 hover:bg-gray-100 ${
                  isScrolled ? 'text-sm' : 'text-base'
                }`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className={`text-gray-700 font-medium transition-all duration-300 ${
                  isScrolled ? 'text-sm' : 'text-base'
                }`}>
                  Hello, {user?.username || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className={`bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-all duration-300 font-medium ${
                    isScrolled ? 'text-sm' : 'text-base'
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className={`bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-all duration-300 font-medium ${
                  isScrolled ? 'text-sm' : 'text-base'
                }`}>
                  Login
                </Link>
                <Link href="/register" className={`bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-all duration-300 font-medium ${
                  isScrolled ? 'text-sm' : 'text-base'
                }`}>
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Cart Button */}
          <div className="md:hidden flex items-center w-12 justify-end">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-700 hover:text-black p-3 transition-all duration-300"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white rounded-full flex items-center justify-center text-xs h-4 w-4">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 py-3 space-y-1">
              <Link
                href="/"
                className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/blogs"
                className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated && user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
            </div>

            <div className="border-t border-gray-200 px-4 py-3">
              {isAuthenticated ? (
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white font-bold">
                      {user?.username ? user.username[0].toUpperCase() : 'U'}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.username}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="ml-auto btn-primary"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    className="block w-full text-center btn-secondary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-center btn-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Cart Slide-out Panel */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 md:hidden animate-fade-in">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 animate-backdrop-fade"
              onClick={() => setIsCartOpen(false)}
            />
            
            {/* Cart Panel */}
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-all duration-400 ease-in-out animate-slide-in-right">
              {/* Cart Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110 transform"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Content */}
              <div className="flex flex-col h-full">
                {cartItems.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="text-center">
                      <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4 animate-pulse-slow" />
                      <p className="text-gray-600 text-lg">Your cart is empty</p>
                      <p className="text-gray-500 text-sm mt-2">Add some items to get started</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {cartItems.map((item, index) => (
                        <div 
                          key={item.id} 
                          className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg animate-fade-in hover:shadow-md transition-all duration-300 hover:scale-105 transform"
                          style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                            }}
                          />
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                            <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 transform"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm font-medium w-8 text-center transition-all duration-300">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 transform"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 p-1 transition-all duration-300 hover:scale-110 transform"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Cart Footer */}
                    <div className="border-t border-gray-200 p-4 space-y-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                      {/* Total */}
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Total:</span>
                        <span className="text-lg font-semibold text-black transition-all duration-300">${getTotalPrice().toFixed(2)}</span>
                      </div>

                      {/* Checkout Button */}
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          router.push('/cart');
                        }}
                        className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 transform"
                      >
                        View Cart & Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
