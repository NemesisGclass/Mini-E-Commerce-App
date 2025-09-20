# FreshMarket - E-Commerce Application

A modern, fully responsive e-commerce application built with Next.js, React, Node.js, and MongoDB. Features a complete shopping cart system, user authentication, admin dashboard, and mobile-optimized design.

## 🚀 Features

### 🛒 Shopping Cart System

- **Persistent Cart**: Items persist across page refreshes using localStorage
- **Mobile Cart Drawer**: Slide-out cart panel optimized for mobile devices
- **Desktop Cart Dropdown**: Hover-activated dropdown with detailed summary
- **Smart Shipping**: Free shipping on orders over $50, $5.99 otherwise
- **Real-time Updates**: Instant cart updates with smooth animations
- **Quantity Management**: Easy +/- controls for item quantities
- **Remove Items**: One-click item removal with confirmation

### 🎨 User Interface

- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Modern Animations**: Smooth transitions and hover effects
- **Monochrome Theme**: Clean black, white, and gray color scheme
- **Touch-Friendly**: Optimized for mobile touch interactions
- **Glass Morphism**: Modern transparent navbar effects
- **Product Cards**: Advanced product cards with hover overlays

### 👤 User Authentication

- **Role-Based Access**: Separate user and admin roles
- **Secure Login**: JWT-based authentication with bcrypt password hashing
- **Protected Routes**: Admin-only access to dashboard
- **Session Management**: Persistent login sessions
- **Input Validation**: Comprehensive form validation

### 🛍️ Product Management

- **Product Catalog**: Browse products by category
- **Product Details**: Detailed product pages with image galleries
- **Quick View**: Modal product preview without page navigation
- **Nutrition Facts**: Integration with Fruityvice API for fruit products
- **Stock Management**: Real-time stock quantity tracking
- **Category Filtering**: Filter products by category

### 📱 Mobile Optimization

- **2-Column Layout**: Product cards display 2 per row on mobile
- **Always-Visible Cart Button**: Mobile cart button always accessible
- **Touch-Optimized**: Large touch targets and smooth interactions
- **Responsive Navigation**: Mobile hamburger menu with animations
- **Slide-out Cart**: Right-side cart panel for mobile users

### 🔧 Admin Dashboard

- **Product Management**: Add, edit, and delete products
- **User Management**: View and manage user accounts
- **Order Tracking**: Monitor customer orders
- **Analytics**: Sales and performance metrics
- **Content Management**: Manage blog posts and content

## 🛠️ Tech Stack

### Frontend

- **Next.js 15**: React framework with App Router
- **React 18**: Modern React with hooks and context
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Context API**: State management for cart and auth

### Backend

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### APIs & Integrations

- **Fruityvice API**: Nutritional information for fruit products
- **MongoDB Atlas**: Cloud database hosting
- **RESTful API**: Clean API endpoints for all operations

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Mini-E-Commerce-App
```

### 2. Backend Setup

```bash
cd server
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/freshmarket?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Database Setup

```bash
# Seed the database with sample products
npm run seed

# Create an admin user
npm run seed-admin
```

### 5. Start Backend Server

```bash
npm start
```

### 6. Frontend Setup

```bash
cd ../client
npm install
```

### 7. Start Frontend Development Server

```bash
npm run dev
```

### 8. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🗂️ Project Structure

```
Mini-E-Commerce-App/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   │   ├── admin/     # Admin dashboard
│   │   │   ├── cart/      # Cart page
│   │   │   ├── products/  # Product pages
│   │   │   ├── blogs/     # Blog pages
│   │   │   ├── login/     # Authentication
│   │   │   └── register/
│   │   ├── components/    # React components
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartDropdown.tsx
│   │   │   └── CartItem.tsx
│   │   ├── contexts/      # React contexts
│   │   │   ├── AuthContext.tsx
│   │   │   └── CartContext.tsx
│   │   ├── lib/          # Utilities and API
│   │   └── types/        # TypeScript definitions
│   ├── public/           # Static assets
│   └── tailwind.config.ts
├── server/               # Node.js backend
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── seed.js         # Database seeding
│   └── index.js        # Server entry point
└── README.md
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products

- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Admin

- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/stats` - Get dashboard statistics (admin only)

### Blogs

- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/:id` - Get single blog post

## 🎨 Design System

### Color Palette

- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: Gray scale (50-950)
- **Success**: Green for free shipping
- **Background**: Light gray (#F9FAFB)

### Typography

- **Font Family**: SUSE Mono (monospace)
- **Logo Font**: DynaPuff (cursive)
- **Headings**: Bold weights (h1-h6)
- **Body**: Regular weight for paragraphs

### Components

#### Product Cards

- **Layout**: 2 columns on mobile, 3-4 on desktop
- **Hover Effects**: Scale and shadow animations
- **Quick Actions**: Add to cart and quick view buttons
- **Mobile**: Always-visible cart button in top-right corner

#### Cart System

- **Mobile**: Slide-out drawer from right side
- **Desktop**: Hover dropdown with detailed summary
- **Animations**: Smooth slide-in/out transitions
- **Persistence**: localStorage integration

#### Navigation

- **Responsive**: Hamburger menu on mobile
- **Transparent**: Glass morphism effect on scroll
- **Centered Logo**: Perfect center alignment
- **Role-based**: Admin link only for admin users

## 📱 Mobile Features

### Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

### Mobile Optimizations

- **Touch Targets**: Minimum 44px for all interactive elements
- **Swipe Gestures**: Natural mobile interactions
- **Viewport Units**: Responsive sizing with vh/vw
- **Performance**: Optimized images and lazy loading

### Mobile Cart

- **Slide-out Panel**: Right-side drawer
- **Full-height**: Uses 80% of viewport height
- **Sticky Footer**: Checkout button always visible
- **Touch-friendly**: Large buttons and spacing

## 🔐 Security Features

### Authentication

- **JWT Tokens**: Secure session management
- **Password Hashing**: bcrypt with salt rounds
- **Role-based Access**: Admin/user permissions
- **Protected Routes**: Middleware protection

### Data Validation

- **Input Sanitization**: XSS protection
- **Schema Validation**: Mongoose model validation
- **CORS Configuration**: Cross-origin security
- **Environment Variables**: Secure configuration

## 🚀 Deployment

### Frontend (Vercel)

1. Connect GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `client/.next`
4. Deploy automatically on push

### Backend (Railway/Heroku)

1. Connect GitHub repository
2. Set environment variables
3. Set start command: `npm start`
4. Deploy automatically on push

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Configure network access
3. Create database user
4. Update connection string in `.env`

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Product browsing and filtering
- [ ] Add to cart functionality
- [ ] Cart persistence across sessions
- [ ] Mobile responsiveness
- [ ] Admin dashboard access
- [ ] Product management (CRUD)
- [ ] Checkout process

### Browser Compatibility

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile**: iOS Safari, Chrome Mobile

## 📈 Performance

### Optimization Techniques

- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Component and image lazy loading
- **Caching**: Browser and API response caching
- **Bundle Analysis**: Webpack bundle analyzer

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🔄 State Management

### Cart Context

```typescript
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getSubtotal: () => number;
  getShippingCost: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}
```

### Auth Context

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
```

## 🎯 Key Features Deep Dive

### Shopping Cart System

The cart system is built with React Context for state management and localStorage for persistence. It features:

- **Smart Shipping Logic**: Automatically calculates free shipping eligibility
- **Real-time Updates**: Instant UI updates when items are added/removed
- **Mobile Optimization**: Touch-friendly controls and slide-out drawer
- **Desktop Enhancement**: Hover dropdown with detailed summary
- **Animation Effects**: Smooth transitions and visual feedback

### Product Management

The product system includes:

- **Image Galleries**: Multiple product images with thumbnail navigation
- **Nutrition Integration**: Fruityvice API for fruit nutritional data
- **Stock Tracking**: Real-time inventory management
- **Category System**: Organized product categorization
- **Search & Filter**: Advanced filtering capabilities

### Mobile-First Design

The application prioritizes mobile users with:

- **Touch Optimization**: Large touch targets and gesture support
- **Responsive Layout**: Adaptive design for all screen sizes
- **Performance**: Optimized for mobile networks
- **Accessibility**: WCAG compliant design patterns

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Conventional Commits**: Standardized commit messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **MongoDB**: For the flexible database solution
- **Fruityvice API**: For nutritional data integration
- **Lucide**: For the beautiful icon library

## 📞 Support

For support and questions:

- **Email**: support@freshmarket.com
- **Documentation**: [Project Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)

---

**FreshMarket** - Your trusted source for fresh, organic, and healthy food products delivered right to your door. 🥬🍎🥕
