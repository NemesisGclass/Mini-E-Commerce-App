'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import CartDropdown from './CartDropdown';
import { Menu, X, User, ShoppingCart } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems, setIsCartOpen } = useCart();
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
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-2 shadow-xl bg-white' : 'py-4 bg-white shadow-lg'
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
                   Home
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
                     Home
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

      </div>
    </nav>
  );
};

export default Navbar;
