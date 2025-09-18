import React from 'react';
import { Leaf, Heart, Truck, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About FreshMarket</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're passionate about bringing you the freshest, healthiest, and most delicious food products right to your doorstep.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                At FreshMarket, we believe that everyone deserves access to fresh, organic, and nutritious food. 
                Our mission is to make healthy eating convenient and affordable for families everywhere.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We work directly with local farmers and suppliers to ensure that every product we deliver 
                meets our high standards for quality, freshness, and sustainability.
              </p>
            </div>
            <div className="bg-primary-100 rounded-lg p-8 text-center">
              <Leaf className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Organic</h3>
              <p className="text-gray-600">All our products are certified organic and sustainably sourced.</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to environmentally friendly practices and supporting sustainable agriculture.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">
                Every product is carefully selected and inspected to ensure the highest quality standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Convenience</h3>
              <p className="text-gray-600">
                Fast, reliable delivery service that brings fresh food directly to your home.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Sarah Johnson</h3>
              <p className="text-gray-600 mb-2">CEO & Founder</p>
              <p className="text-sm text-gray-500">
                Passionate about healthy living and sustainable food systems.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Mike Chen</h3>
              <p className="text-gray-600 mb-2">Head of Operations</p>
              <p className="text-sm text-gray-500">
                Expert in supply chain management and quality assurance.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Emily Rodriguez</h3>
              <p className="text-gray-600 mb-2">Nutritionist</p>
              <p className="text-sm text-gray-500">
                Certified nutritionist helping customers make healthy choices.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-6">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-primary-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Local Partners</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-primary-100">Organic Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
