import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, ShoppingCart, CreditCard, Truck, Shield, AlertTriangle } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By using FreshMarket, you agree to these terms.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: December 2024
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to FreshMarket. These Terms of Service ("Terms") govern your use of our website 
              and services. By accessing or using our platform, you agree to be bound by these Terms. 
              If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By using our website, creating an account, or making a purchase, you acknowledge that you 
              have read, understood, and agree to be bound by these Terms and our Privacy Policy. 
              These Terms constitute a legally binding agreement between you and FreshMarket.
            </p>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Registration</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                To access certain features of our service, you may be required to create an account. 
                When registering, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </div>
          </section>

          {/* Products and Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <ShoppingCart className="w-6 h-6 mr-3 text-black" />
              Products and Services
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                FreshMarket offers fresh, organic, and healthy food products for purchase. We strive to 
                provide accurate product descriptions, images, and pricing information.
              </p>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Availability</h3>
                <p className="text-gray-700 leading-relaxed">
                  Product availability is subject to change without notice. We reserve the right to 
                  limit quantities, discontinue products, or refuse orders at our discretion.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Pricing</h3>
                <p className="text-gray-700 leading-relaxed">
                  All prices are subject to change without notice. Prices displayed on our website 
                  are in USD and may not include applicable taxes, shipping, or handling fees.
                </p>
              </div>
            </div>
          </section>

          {/* Orders and Payment */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-6 h-6 mr-3 text-black" />
              Orders and Payment
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Processing</h3>
                <p className="text-gray-700 leading-relaxed">
                  All orders are subject to acceptance by FreshMarket. We reserve the right to refuse 
                  or cancel any order for any reason, including but not limited to product availability, 
                  pricing errors, or suspected fraudulent activity.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Terms</h3>
                <p className="text-gray-700 leading-relaxed">
                  Payment is required at the time of order placement. We accept major credit cards, 
                  debit cards, and other payment methods as specified on our website. You represent 
                  that you have the legal right to use any payment method you provide.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Confirmation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Upon successful order placement, you will receive an order confirmation email. 
                  This confirmation does not guarantee product availability or delivery.
                </p>
              </div>
            </div>
          </section>

          {/* Shipping and Delivery */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Truck className="w-6 h-6 mr-3 text-black" />
              Shipping and Delivery
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                We strive to deliver your orders promptly and safely. Shipping terms include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>Risk of loss transfers to you upon delivery</li>
                <li>You are responsible for providing accurate delivery addresses</li>
                <li>We may require signature confirmation for certain deliveries</li>
                <li>Additional charges may apply for special delivery requirements</li>
              </ul>
            </div>
          </section>

          {/* Returns and Refunds */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns and Refunds</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                We want you to be satisfied with your purchase. Our return policy includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Returns must be initiated within 30 days of delivery</li>
                <li>Products must be in original condition and packaging</li>
                <li>Perishable items may have different return policies</li>
                <li>Refunds will be processed to the original payment method</li>
                <li>Shipping costs for returns are the customer's responsibility</li>
              </ul>
            </div>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Conduct</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to use our services for any unlawful purpose or in any way that could 
              damage, disable, overburden, or impair our website. Prohibited activities include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Violating any applicable laws or regulations</li>
              <li>Transmitting harmful or malicious code</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Interfering with other users' enjoyment of our services</li>
              <li>Using automated systems to access our website</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on our website, including text, graphics, logos, images, and software, 
              is the property of FreshMarket or its licensors and is protected by copyright and 
              other intellectual property laws. You may not use our content without written permission.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-black" />
              Disclaimers
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are provided "as is" without warranties of any kind. We disclaim all 
              warranties, express or implied, including but not limited to warranties of merchantability, 
              fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall FreshMarket be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including but not limited to loss of profits, 
              data, or use, arising out of or relating to your use of our services.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless FreshMarket and its officers, directors, 
              employees, and agents from any claims, damages, or expenses arising from your use 
              of our services or violation of these Terms.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We may terminate or suspend your account and access to our services immediately, 
              without prior notice, for any reason, including if you breach these Terms. Upon 
              termination, your right to use our services will cease immediately.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the 
              State of California, without regard to its conflict of law provisions. Any disputes 
              arising from these Terms shall be resolved in the courts of California.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of 
              any material changes by posting the updated Terms on our website. Your continued 
              use of our services after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@freshmarket.com<br />
                <strong>Phone:</strong> 1-800-FRESH-MARKET<br />
                <strong>Address:</strong> 123 Fresh Street, Organic City, OC 12345
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
