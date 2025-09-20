import axios from 'axios';
import { Product, Blog, User, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const productsAPI = {
  getAll: async (page: number = 1, limit: number = 12, category?: string): Promise<ApiResponse<Product[]>> => {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (category) {
        params.append('category', category);
      }
      const response = await api.get<ApiResponse<Product[]>>(`/products?${params.toString()}`);
      return response.data;
    } catch (error) {
      // Mock data for development when backend is not available
      const mockProducts: Product[] = [
        {
          _id: '1',
          name: 'Fresh Organic Apples',
          description: 'Crisp and juicy organic apples, perfect for snacking or baking.',
          price: 4.99,
          category: 'fruits',
          imageGallery: ['https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400'],
          nutritionFacts: {
            calories: 95,
            protein: 0.5,
            carbohydrates: 25,
            fat: 0.3,
            fiber: 4,
            sugar: 19,
            sodium: 2,
            servingSize: '1 medium apple'
          },
          stockQuantity: 50,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '2',
          name: 'Organic Carrots',
          description: 'Fresh organic carrots, rich in beta-carotene and perfect for cooking.',
          price: 3.49,
          category: 'vegetables',
          imageGallery: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400'],
          nutritionFacts: {
            calories: 41,
            protein: 0.9,
            carbohydrates: 10,
            fat: 0.2,
            fiber: 2.8,
            sugar: 4.7,
            sodium: 69,
            servingSize: '1 medium carrot'
          },
          stockQuantity: 30,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '3',
          name: 'Organic Milk',
          description: 'Fresh organic whole milk from grass-fed cows.',
          price: 5.99,
          category: 'dairy',
          imageGallery: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400'],
          nutritionFacts: {
            calories: 150,
            protein: 8,
            carbohydrates: 12,
            fat: 8,
            fiber: 0,
            sugar: 12,
            sodium: 105,
            servingSize: '1 cup (240ml)'
          },
          stockQuantity: 25,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      const filteredProducts = category 
        ? mockProducts.filter(p => p.category === category)
        : mockProducts;

      return {
        success: true,
        data: filteredProducts,
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalProducts: filteredProducts.length,
          hasNext: false,
          hasPrev: false
        }
      };
    }
  },
  
  getById: async (id: string): Promise<ApiResponse<Product>> => {
    try {
      const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
      return response.data;
    } catch (error) {
      // Mock data for development when backend is not available
      const mockProducts: Product[] = [
        {
          _id: '1',
          name: 'Fresh Organic Apples',
          description: 'Crisp and juicy organic apples, perfect for snacking or baking. These premium apples are hand-picked from our partner orchards and delivered fresh to your door.',
          price: 4.99,
          category: 'fruits',
          imageGallery: [
            'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800',
            'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800',
            'https://images.unsplash.com/photo-1619546813926-a3af8e82f5a0?w=800'
          ],
          nutritionFacts: {
            calories: 95,
            protein: 0.5,
            carbohydrates: 25,
            fat: 0.3,
            fiber: 4,
            sugar: 19,
            sodium: 2,
            servingSize: '1 medium apple'
          },
          stockQuantity: 50,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '2',
          name: 'Organic Carrots',
          description: 'Fresh organic carrots, rich in beta-carotene and perfect for cooking. These vibrant orange carrots are grown without pesticides and harvested at peak freshness.',
          price: 3.49,
          category: 'vegetables',
          imageGallery: [
            'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800',
            'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=800',
            'https://images.unsplash.com/photo-1582515073490-39981397c445?w=800'
          ],
          nutritionFacts: {
            calories: 41,
            protein: 0.9,
            carbohydrates: 10,
            fat: 0.2,
            fiber: 2.8,
            sugar: 4.7,
            sodium: 69,
            servingSize: '1 medium carrot'
          },
          stockQuantity: 30,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '3',
          name: 'Organic Milk',
          description: 'Fresh organic whole milk from grass-fed cows. Rich, creamy, and full of essential nutrients. Perfect for drinking, cooking, or making your favorite dairy products.',
          price: 5.99,
          category: 'dairy',
          imageGallery: [
            'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
            'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800'
          ],
          nutritionFacts: {
            calories: 150,
            protein: 8,
            carbohydrates: 12,
            fat: 8,
            fiber: 0,
            sugar: 12,
            sodium: 105,
            servingSize: '1 cup (240ml)'
          },
          stockQuantity: 25,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      const product = mockProducts.find(p => p._id === id) || mockProducts[0];
      
      return {
        success: true,
        data: product
      };
    }
  },
  
  create: async (product: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> => {
    const response = await api.post<ApiResponse<Product>>('/products', product);
    return response.data;
  },
  
  update: async (id: string, product: Partial<Product>): Promise<ApiResponse<Product>> => {
    const response = await api.put<ApiResponse<Product>>(`/products/${id}`, product);
    return response.data;
  },
  
  delete: async (id: string): Promise<ApiResponse<any>> => {
    const response = await api.delete<ApiResponse<any>>(`/products/${id}`);
    return response.data;
  },
};

export const blogsAPI = {
  getAll: async (page: number = 1, limit: number = 10): Promise<ApiResponse<Blog[]>> => {
    try {
      const response = await api.get<ApiResponse<Blog[]>>(`/blogs?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      // Mock data for development when backend is not available
      const mockBlogs: Blog[] = [
        {
          _id: '1',
          title: 'The Benefits of Organic Farming',
          content: '<p>Organic farming has numerous benefits for both our health and the environment...</p>',
          author: 'Sarah Johnson',
          image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800',
          excerpt: 'Discover why organic farming is better for you and the planet.',
          tags: ['organic', 'farming', 'health', 'sustainability'],
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Seasonal Eating: A Guide to Fresh Produce',
          content: '<p>Eating seasonally means enjoying fruits and vegetables at their peak...</p>',
          author: 'Mike Chen',
          image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
          excerpt: 'Learn about the benefits of seasonal eating and what to buy when.',
          tags: ['seasonal', 'produce', 'nutrition', 'guide'],
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      return {
        success: true,
        data: mockBlogs,
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalProducts: mockBlogs.length,
          hasNext: false,
          hasPrev: false
        }
      };
    }
  },
  
  getById: async (id: string): Promise<ApiResponse<Blog>> => {
    try {
      const response = await api.get<ApiResponse<Blog>>(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      // Mock data for development when backend is not available
      const mockBlogs: Blog[] = [
        {
          _id: '1',
          title: 'The Benefits of Organic Farming',
          content: '<p>Organic farming has numerous benefits for both our health and the environment. When you choose organic products, you\'re not just making a healthier choice for yourself, but also supporting sustainable agriculture practices that protect our planet.</p><p>One of the key advantages of organic farming is the absence of harmful pesticides and synthetic fertilizers. This means the food you consume is free from potentially harmful chemicals that can accumulate in your body over time.</p><p>Additionally, organic farming promotes biodiversity and soil health. By rotating crops and using natural methods to control pests, organic farmers create a more balanced ecosystem that benefits both the environment and the quality of the produce.</p>',
          author: 'Sarah Johnson',
          image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800',
          excerpt: 'Discover why organic farming is better for you and the planet.',
          tags: ['organic', 'farming', 'health', 'sustainability'],
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Seasonal Eating: A Guide to Fresh Produce',
          content: '<p>Eating seasonally means enjoying fruits and vegetables at their peak of flavor and nutritional value. When produce is harvested at the right time and consumed soon after, it provides maximum health benefits and taste.</p><p>Spring brings us fresh greens like asparagus, peas, and strawberries. These foods are naturally cleansing and help our bodies transition from winter\'s heavier foods.</p><p>Summer offers an abundance of colorful fruits and vegetables like tomatoes, corn, peaches, and berries. These foods are hydrating and provide essential vitamins and antioxidants.</p>',
          author: 'Mike Chen',
          image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
          excerpt: 'Learn about the benefits of seasonal eating and what to buy when.',
          tags: ['seasonal', 'produce', 'nutrition', 'guide'],
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      const blog = mockBlogs.find(b => b._id === id) || mockBlogs[0];
      
      return {
        success: true,
        data: blog
      };
    }
  },
  
  create: async (blog: Omit<Blog, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Blog>> => {
    const response = await api.post<ApiResponse<Blog>>('/blogs', blog);
    return response.data;
  },
  
  update: async (id: string, blog: Partial<Blog>): Promise<ApiResponse<Blog>> => {
    const response = await api.put<ApiResponse<Blog>>(`/blogs/${id}`, blog);
    return response.data;
  },
  
  delete: async (id: string): Promise<ApiResponse<any>> => {
    const response = await api.delete<ApiResponse<any>>(`/blogs/${id}`);
    return response.data;
  },
};

export const authAPI = {
  register: async (userData: { username: string; email: string; password: string }): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials: { email: string; password: string }): Promise<ApiResponse<{ token: string; user: User }>> => {
    const response = await api.post<ApiResponse<{ token: string; user: User }>>('/auth/login', credentials);
    return response.data;
  },
  
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>('/auth/profile');
    return response.data;
  },
};
