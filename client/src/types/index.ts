export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageGallery: string[];
  nutritionFacts: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
    servingSize: string;
  };
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  image: string;
  excerpt: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
