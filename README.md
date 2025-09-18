# Mini E-Commerce App

A full-stack e-commerce application built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

- **Frontend**: React + TypeScript + TailwindCSS
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Shopping Cart**: Add/remove items with quantity management
- **Product Management**: View products with detailed pages

## Tech Stack

- **Frontend**: React 18, TypeScript, TailwindCSS, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Styling**: TailwindCSS

## Project Structure

```
Mini-E-Commerce-App/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # React components
│   │   └── App.tsx       # Main app component
│   └── package.json
├── server/                # Express backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── index.js          # Server entry point
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Mini-E-Commerce-App
   ```

2. **Install backend dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `server` directory:

   ```env
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key_here
   ```

5. **Start MongoDB**

   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGO_URI` in your `.env` file.

6. **Seed the database** (optional)
   ```bash
   cd server
   npm run seed
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd server
   npm run dev
   ```

   The server will start on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm start
   ```
   The frontend will start on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Add new product (admin)

## Features Overview

### Frontend Pages

- **Home**: Product listing with responsive grid
- **Product Page**: Detailed product view with add to cart
- **Cart**: Shopping cart with quantity management
- **Login/Register**: User authentication

### Key Functionality

- User registration and login
- Product browsing and search
- Shopping cart management
- Responsive design for all devices
- JWT-based authentication

## Deployment

### Frontend (Vercel)

1. Build the frontend: `npm run build`
2. Deploy to Vercel
3. Update API URLs to point to your backend

### Backend (Render/Heroku)

1. Deploy to Render or Heroku
2. Set environment variables
3. Connect to MongoDB Atlas

## Development

### Adding New Features

1. Create new routes in `server/routes/`
2. Add corresponding models in `server/models/`
3. Create React components in `client/src/pages/`
4. Update routing in `client/src/App.tsx`

### Database Schema

**User Model**

```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed)
}
```

**Product Model**

```javascript
{
  name: String,
  description: String,
  price: Number,
  image: String
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
