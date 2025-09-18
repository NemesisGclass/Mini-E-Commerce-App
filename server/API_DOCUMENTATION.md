# Food E-commerce API Documentation

## Overview

This is a Node.js + Express backend API for a food e-commerce website with MongoDB database. The API provides endpoints for products, blogs, and user authentication.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most admin routes require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Health Check

- **GET** `/health` - Check if API is running

### Authentication Routes (`/api/auth`)

#### Register User

- **POST** `/register`
- **Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

#### Login User

- **POST** `/login`
- **Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "string",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
}
```

#### Get User Profile

- **GET** `/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**

```json
{
  "success": true,
  "data": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

### Product Routes (`/api/products`)

#### Get All Products

- **GET** `/products`
- **Query Parameters:**
  - `category` (optional): Filter by category
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
- **Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "category": "string",
      "imageGallery": ["string"],
      "nutritionFacts": {
        "calories": "number",
        "protein": "number",
        "carbohydrates": "number",
        "fat": "number",
        "fiber": "number",
        "sugar": "number",
        "sodium": "number",
        "servingSize": "string"
      },
      "stockQuantity": "number",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ],
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalProducts": "number",
    "hasNext": "boolean",
    "hasPrev": "boolean"
  }
}
```

#### Get Single Product

- **GET** `/products/:id`
- **Response:**

```json
{
  "success": true,
  "data": {
    "_id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "category": "string",
    "imageGallery": ["string"],
    "nutritionFacts": {
      "calories": "number",
      "protein": "number",
      "carbohydrates": "number",
      "fat": "number",
      "fiber": "number",
      "sugar": "number",
      "sodium": "number",
      "servingSize": "string"
    },
    "stockQuantity": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### Create Product (Admin Only)

- **POST** `/products`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**

```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "imageGallery": ["string"],
  "nutritionFacts": {
    "calories": "number",
    "protein": "number",
    "carbohydrates": "number",
    "fat": "number",
    "fiber": "number",
    "sugar": "number",
    "sodium": "number",
    "servingSize": "string"
  },
  "stockQuantity": "number"
}
```

#### Update Product (Admin Only)

- **PUT** `/products/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Same as create product

#### Delete Product (Admin Only)

- **DELETE** `/products/:id`
- **Headers:** `Authorization: Bearer <token>`

### Blog Routes (`/api/blogs`)

#### Get All Blogs

- **GET** `/blogs`
- **Query Parameters:**
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
  - `published` (optional): Filter published blogs (default: true)
- **Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": "string",
      "image": "string",
      "excerpt": "string",
      "tags": ["string"],
      "published": "boolean",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ],
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalBlogs": "number",
    "hasNext": "boolean",
    "hasPrev": "boolean"
  }
}
```

#### Get Single Blog

- **GET** `/blogs/:id`
- **Response:**

```json
{
  "success": true,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": "string",
    "image": "string",
    "excerpt": "string",
    "tags": ["string"],
    "published": "boolean",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

#### Create Blog (Admin Only)

- **POST** `/blogs`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**

```json
{
  "title": "string",
  "content": "string",
  "author": "string",
  "image": "string",
  "excerpt": "string",
  "tags": ["string"],
  "published": "boolean"
}
```

#### Update Blog (Admin Only)

- **PUT** `/blogs/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Same as create blog

#### Delete Blog (Admin Only)

- **DELETE** `/blogs/:id`
- **Headers:** `Authorization: Bearer <token>`

## Data Models

### Product Categories

- `fruits`
- `vegetables`
- `dairy`
- `meat`
- `grains`
- `beverages`
- `snacks`
- `frozen`
- `bakery`
- `other`

### Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

## Environment Variables

Create a `.env` file in the server directory:

```
MONGO_URI=mongodb://localhost:27017/food-ecommerce
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm run dev
```

3. Seed the database (optional):

```bash
npm run seed
```

## Testing the API

You can test the API using tools like Postman, curl, or any HTTP client. Here are some example requests:

### Register a user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Get all products:

```bash
curl http://localhost:5000/api/products
```

### Get products by category:

```bash
curl http://localhost:5000/api/products?category=fruits
```
