'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { productsAPI } from '@/lib/api';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { fruityviceService, FruitNutrition } from '@/lib/fruityvice';
import NutritionDisplay from '@/components/NutritionDisplay';
import { 
  ArrowLeft, Plus, Minus, ShoppingCart, Heart, Share2, 
  Star, Eye, ZoomIn, Truck, Shield, RotateCcw, 
  Facebook, Twitter, Instagram, Mail, MessageCircle,
  TrendingUp, Award, Leaf, Zap, Clock, Users, X
} from 'lucide-react';

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [nutrition, setNutrition] = useState<FruitNutrition | null>(null);
  const [nutritionLoading, setNutritionLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'nutrition' | 'reviews' | 'shipping'>('description');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [showShareMenu, setShowShareMenu] = useState(false);

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

  // Fetch nutrition data when product is loaded
  useEffect(() => {
    const fetchNutrition = async (productName: string) => {
      if (product?.category !== 'fruits') return;
      
      try {
        setNutritionLoading(true);
        const response = await fruityviceService.getFruitByName(productName.toLowerCase());
        if (response.success && response.data) {
          setNutrition(response.data);
        }
      } catch (err) {
        console.error('Error fetching nutrition:', err);
      } finally {
        setNutritionLoading(false);
      }
    };

    if (product) {
      fetchNutrition(product.name);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageGallery[0],
      });
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = product?.name || 'Check out this product';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing, copy to clipboard
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`);
        break;
    }
    setShowShareMenu(false);
  };

  const getProductRating = () => {
    // Mock rating system - in real app, this would come from reviews
    return 4.5;
  };

  const getReviewCount = () => {
    // Mock review count - in real app, this would come from reviews
    return Math.floor(Math.random() * 100) + 20;
  };

  const getDiscountPercentage = () => {
    // Mock discount calculation
    const discounts: { [key: string]: number } = {
      'apple': 15,
      'banana': 10,
      'strawberry': 20,
      'spinach': 5,
      'chicken': 12,
    };
    return discounts[product?.name.toLowerCase() || ''] || 0;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      fruits: 'bg-gray-100 text-gray-800',
      vegetables: 'bg-gray-100 text-gray-800',
      dairy: 'bg-gray-100 text-gray-800',
      meat: 'bg-gray-100 text-gray-800',
      grains: 'bg-gray-100 text-gray-800',
      beverages: 'bg-gray-100 text-gray-800',
      snacks: 'bg-gray-100 text-gray-800',
      frozen: 'bg-gray-100 text-gray-800',
      bakery: 'bg-gray-100 text-gray-800',
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
          <p className="text-black text-lg mb-4">{error || 'Product not found'}</p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/" className="text-gray-500 hover:text-gray-700">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.category}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Enhanced Product Images */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Image with Zoom */}
            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-lg">
                <img
                  src={product.imageGallery[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/600x600?text=No+Image';
                  }}
                />
              </div>
              
              {/* Zoom Button */}
              <button
                onClick={() => setShowImageZoom(true)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all duration-200 touch-manipulation"
              >
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </button>

              {/* Discount Badge */}
              {getDiscountPercentage() > 0 && (
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold animate-pulse">
                  -{getDiscountPercentage()}%
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {product.imageGallery.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                {product.imageGallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 touch-manipulation ${
                      selectedImageIndex === index 
                        ? 'border-black shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/150x150?text=No+Image';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Product Info */}
          <div className="space-y-6">
            {/* Category and Badges */}
            <div className="flex items-center space-x-3">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(product.category)}`}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
              {product.stockQuantity === 0 && (
                <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              )}
              {product.stockQuantity < 10 && product.stockQuantity > 0 && (
                <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Low Stock
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>
            
            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
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
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">{formatPrice(product.price)}</span>
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
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{product.description}</p>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Leaf className="w-5 h-5 text-black" />
                <span className="text-sm font-medium text-black">Organic Certified</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-black" />
                <span className="text-sm font-medium text-black">Quality Guaranteed</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Truck className="w-5 h-5 text-black" />
                <span className="text-sm font-medium text-black">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <RotateCcw className="w-5 h-5 text-black" />
                <span className="text-sm font-medium text-black">Easy Returns</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors touch-manipulation"
                >
                  <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <span className="text-lg sm:text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors touch-manipulation"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stockQuantity === 0}
                  className="flex-1 bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center touch-manipulation"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <div className="flex space-x-3 sm:space-x-4">
                  <button
                    onClick={toggleWishlist}
                    className={`w-full sm:w-14 h-12 sm:h-14 border-2 rounded-lg flex items-center justify-center transition-all duration-200 touch-manipulation ${
                      isWishlisted
                        ? 'border-black bg-gray-50 text-black'
                        : 'border-gray-300 hover:border-black hover:text-black'
                    }`}
                  >
                    <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="w-full sm:w-14 h-12 sm:h-14 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-black hover:text-black transition-colors touch-manipulation"
                  >
                    <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-lg">
                  <p className="text-sm font-medium text-gray-700 mb-3">Share this product</p>
                  <div className="grid grid-cols-1 sm:flex sm:space-x-3 gap-2 sm:gap-0">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center justify-center space-x-2 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors touch-manipulation"
                    >
                      <Facebook className="w-4 h-4" />
                      <span className="text-sm">Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center justify-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors touch-manipulation"
                    >
                      <Twitter className="w-4 h-4" />
                      <span className="text-sm">Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('email')}
                      className="flex items-center justify-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors touch-manipulation"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Email</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stock and Shipping Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {product.stockQuantity > 0 
                    ? `${product.stockQuantity} items in stock`
                    : 'Currently out of stock'
                  }
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'description', label: 'Description', icon: Eye },
                { id: 'nutrition', label: 'Nutrition Facts', icon: Award },
                { id: 'reviews', label: 'Reviews', icon: MessageCircle },
                { id: 'shipping', label: 'Shipping & Returns', icon: Truck }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-black mb-3 flex items-center">
                      <Leaf className="w-5 h-5 mr-2" />
                      Health Benefits
                    </h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Rich in vitamins and minerals</li>
                      <li>• Supports immune system</li>
                      <li>• Promotes healthy digestion</li>
                      <li>• Natural antioxidants</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-black mb-3 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Storage Tips
                    </h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Store in cool, dry place</li>
                      <li>• Refrigerate after opening</li>
                      <li>• Use within 7 days</li>
                      <li>• Keep away from direct sunlight</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-8">
                {/* Basic Nutrition Facts */}
                {product.nutritionFacts && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Nutrition Facts</h3>
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-black">{product.nutritionFacts.calories}</div>
                          <div className="text-sm text-gray-600">Calories</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-black">{product.nutritionFacts.protein}g</div>
                          <div className="text-sm text-gray-600">Protein</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-black">{product.nutritionFacts.carbohydrates}g</div>
                          <div className="text-sm text-gray-600">Carbs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-black">{product.nutritionFacts.fat}g</div>
                          <div className="text-sm text-gray-600">Fat</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div><strong>Fiber:</strong> {product.nutritionFacts.fiber}g</div>
                        <div><strong>Sugar:</strong> {product.nutritionFacts.sugar}g</div>
                        <div><strong>Sodium:</strong> {product.nutritionFacts.sodium}mg</div>
                        <div><strong>Serving Size:</strong> {product.nutritionFacts.servingSize}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fruityvice Nutrition Data for Fruits */}
                {product.category === 'fruits' && (
                  <div>
                    {nutritionLoading ? (
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="animate-pulse">
                          <div className="h-6 bg-gray-200 rounded mb-4"></div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : nutrition ? (
                      <NutritionDisplay nutrition={nutrition} />
                    ) : (
                      <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <p className="text-gray-600">Nutritional information not available for this fruit.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {/* Mock Reviews */}
                  {[
                    { name: 'Sarah M.', rating: 5, date: '2 days ago', comment: 'Excellent quality! Fresh and delicious. Will definitely order again.' },
                    { name: 'John D.', rating: 4, date: '1 week ago', comment: 'Good product, arrived quickly. Packaging was perfect.' },
                    { name: 'Emily R.', rating: 5, date: '2 weeks ago', comment: 'Amazing taste and quality. Highly recommended!' }
                  ].map((review, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-black font-semibold">{review.name[0]}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{review.name}</p>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-gray-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Shipping & Returns</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-black" />
                      Shipping Information
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Free shipping on orders over $50</li>
                      <li>• Standard delivery: 3-5 business days</li>
                      <li>• Express delivery: 1-2 business days</li>
                      <li>• Same-day delivery available in select areas</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <RotateCcw className="w-5 h-5 mr-2 text-black" />
                      Returns & Exchanges
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• 30-day money-back guarantee</li>
                      <li>• Free returns on all orders</li>
                      <li>• Easy online return process</li>
                      <li>• Full refund within 5-7 business days</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Image Zoom Modal */}
        {showImageZoom && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setShowImageZoom(false)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
              <img
                src={product.imageGallery[selectedImageIndex]}
                alt={product.name}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
