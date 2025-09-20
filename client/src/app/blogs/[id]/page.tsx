'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { blogsAPI } from '@/lib/api';
import { Blog } from '@/types';
import { Calendar, User, ArrowLeft } from 'lucide-react';

export default function BlogDetail() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await blogsAPI.getById(id);
        setBlog(response.data);
      } catch (err) {
        setError('Failed to fetch blog post');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <p className="text-black text-lg mb-4">{error || 'Blog post not found'}</p>
          <Link href="/blogs" className="btn-primary">
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/blogs" className="text-primary-600 hover:text-primary-500 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Blogs
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(blog.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <User className="w-4 h-4 mr-1" />
              {blog.author}
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/800x400?text=No+Image';
            }}
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* Author Info */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {blog.author.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{blog.author}</h3>
              <p className="text-gray-600">Food Blogger & Nutrition Expert</p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Placeholder for related articles */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">5 Healthy Breakfast Ideas</h3>
              <p className="text-gray-600 mb-4">Start your day with these nutritious and delicious breakfast options...</p>
              <Link href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                Read More →
              </Link>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Seasonal Produce Guide</h3>
              <p className="text-gray-600 mb-4">Learn about the best fruits and vegetables to buy each season...</p>
              <Link href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
