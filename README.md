# BuildBazaar

<<<<<<< HEAD
A full-stack e-commerce platform for building custom PCs. BuildBazaar allows users to browse components, build their own PC configurations, manage shopping carts, place orders, and interact with an AI chatbot for assistance.

 Tech Stack

 Backend
- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Password Hashing: bcryptjs
- Validation: express-validator
- HTTP Client: Axios
- Development: Nodemon

 Frontend
- Framework: Next.js 14
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: Shadcn/ui (Radix UI)
- HTTP Client: Axios
- Icons: Lucide React
- State Management: React Context API
- QR Code: qrcode.react, react-qr-code
- 3D Graphics: Three.js
- Notifications: Sonner
- Markdown: react-markdown
- Cookies: js-cookie

 Features

User Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing

Product Management
- Browse all PC components
- Search functionality
- Filter products by category
- Detailed product pages
- Product reviews

Shopping Experience
- Shopping cart management
- Add/remove items from cart
- Cart persistence
- Checkout process

Order Management
- Create and track orders
- View order history
- Order status tracking

PC Builder
- Custom configuration builder
- Part selector
- Configuration preview
- Review and finalize builds

Chat & Support
- Real-time chat functionality
- AI-powered chatbot assistance
- Support chat routing

User Profile
- Profile management
- Address management
- Order history

Additional Features
- Product categories
- Blog section
- Promo banners
- Features showcase
- Recent news section
- Happy hours deals

 Installation

 Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

 Backend Setup

1. Navigate to the backend directory:
bash
cd backend


2. Install dependencies:
bash
npm install


3. Create a `.env` file in the backend directory with the following variables:
env
MONGODB_URI=mongodb://localhost:27017/buildbazaar
JWT_SECRET=your_jwt_secret_key
PORT=5000


4. (Optional) Seed the database with initial products:
bash
node seedProducts.js


 Frontend Setup

1. Navigate to the frontend directory:
bash
cd my-app


2. Install dependencies:
bash
npm install


3. Create a `.env.local` file in the my-app directory:
env
NEXT_PUBLIC_API_URL=http://localhost:5000/api


 Running the Application

 Development Mode

Backend:
bash
cd backend
npm run dev

Server will run on `http://localhost:5000`

Frontend (in a new terminal):
bash
cd my-app
npm run dev

Application will be available at `http://localhost:3000`

 Production Mode

Backend:
bash
cd backend
npm run start


Frontend:
bash
cd my-app
npm run build
npm run start


 API Endpoints

 Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user (requires auth)

 Products
- `GET /api/products` - Get all products
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/:id` - Get product details
- `GET /api/products/category/:category` - Get products by category

 Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:id` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove item from cart

 Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status

 Chat
- `POST /api/chat/send` - Send chat message
- `GET /api/chat/history` - Get chat history

 AI Chat
- `POST /api/ai-chat/message` - Send message to AI chatbot

 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, categories, products, features |
| Shop | `/shop` | Product catalog with filters and sorting |
| Product Details | `/shop/[category]/[id]` | Detailed product information |
| PC Builder | `/build` | Custom PC configuration builder |
| Build Review | `/build/review` | Review and finalize custom builds |
| Search | `/search` | Product search results |
| Cart | `/cart` | Shopping cart management |
| Checkout | `/checkout` | Checkout process |
| Login | `/login` | User login |
| Signup | `/signup` | User registration |
| Profile | `/profile` | User profile and settings |
| Orders | `/order` | Order history and tracking |
| About | `/about` | About page |
| Blogs | `/blogs` | Blog articles |

 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Users register or login
2. Server returns a JWT token
3. Token is stored in browser cookies/localStorage
4. Token is sent in Authorization header for protected routes
5. Middleware validates token on backend

 State Management

The application uses React Context API for state management:

- AuthContext: User authentication state
- CartContext: Shopping cart state
- ChatContext: Chat functionality state
- ThemeContext: Application theme preferences

 Environment Variables

 Backend (.env)
env
MONGODB_URI=mongodb://localhost:27017/buildbazaar
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development


 Frontend (.env.local)
env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000


 Scripts

 Backend
- `npm run dev` - Start development server with hot reload
- `npm run start` - Start production server

 Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

 Database Schema

 User Model
- name, email, password, address, phone
- Authentication and profile information

 Product Model
- name, description, price, category, image, specifications
- Component specifications and availability

 Cart Model
- userId, items (product references with quantity)
- User shopping cart

 Order Model
- userId, items, totalPrice, status, shippingAddress, createdAt
- Order history and tracking

 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

 License

ISC License

 Repository

[GitHub Repository](https://github.com/omkarr-04/Build-Bazaar)

 Support

For issues and support, please refer to the [GitHub Issues](https://github.com/omkarr-04/Build-Bazaar/issues) page.
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

 Getting Started

First, run the development server:

bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> e1e05b03b6588fdccfab77f7fdaeda1c90687f0c
