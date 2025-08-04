# Simple Blog Application

A full-stack blog application built with React (Frontend) and Node.js/Express (Backend) with MongoDB as the database. Users can create, read, update, and delete blog posts with authentication and profile management.

## 🚀 Features

### User Features
- **User Authentication**: Sign up, login, and logout functionality
- **Profile Management**: Update profile information and profile picture
- **Blog Creation**: Create new blog posts with title, description, and images
- **Blog Management**: View, edit, and delete your own blog posts
- **Blog Dashboard**: Personal dashboard showing all your published blogs
- **Responsive Design**: Modern UI with glassmorphism effects

### Technical Features
- **JWT Authentication**: Secure token-based authentication
- **File Upload**: Image upload for blog posts and profile pictures
- **MongoDB Integration**: NoSQL database for data persistence
- **CORS Enabled**: Cross-origin resource sharing for frontend-backend communication
- **Password Security**: Bcrypt hashing for secure password storage

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - UI library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **Styled Components** - CSS-in-JS styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie parsing middleware

## 📁 Project Structure

```
simple blog/
├── backend/
│   ├── config/
│   │   └── multerconfig.js          # File upload configuration
│   ├── connection/
│   │   └── connect.js               # MongoDB connection
│   ├── controllers/
│   │   ├── blog.js                  # Blog CRUD operations
│   │   └── user.js                  # User authentication & management
│   ├── middlewares/
│   │   └── auth.js                  # JWT authentication middleware
│   ├── models/
│   │   ├── bolg.js                  # Blog data model
│   │   └── user.js                  # User data model
│   ├── routes/
│   │   ├── blog.js                  # Blog API routes
│   │   ├── checkcookieRoutes.js     # Authentication routes
│   │   ├── image.js                 # Image upload routes
│   │   └── user.js                  # User API routes
│   ├── services/
│   │   └── auth.js                  # Authentication services
│   ├── public/
│   │   └── uploads/                 # File storage
│   │       ├── blogimg/             # Blog images
│   │       └── profile/             # Profile pictures
│   └── index.js                     # Server entry point
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Account.jsx          # User profile & blog dashboard
    │   │   ├── Add.jsx              # Blog creation form
    │   │   ├── BlogDetail.jsx       # Individual blog view
    │   │   ├── Hero.jsx             # Homepage component
    │   │   ├── Login.jsx            # Login form
    │   │   ├── Nav.jsx              # Navigation component
    │   │   ├── Signup.jsx           # Registration form
    │   │   ├── card.jsx             # Blog card component
    │   │   └── Btn.jsx              # Reusable button component
    │   ├── context/
    │   │   └── authcontext.jsx      # Authentication context
    │   ├── App.jsx                  # Main application component
    │   ├── main.jsx                 # Application entry point
    │   └── index.css                # Global styles
    └── assets/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simple-blog
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the backend directory:
   ```env
   JWT_SECRET=your_jwt_secret_key_here
   MONGODB_URI=mongodb://127.0.0.1:27017/smpleBlog
   PORT=8000
   ```

5. **Start the Application**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```
   Server will start on `http://localhost:8000`

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will start on `http://localhost:5173`

## 📖 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/signup` | Register a new user |
| POST | `/user/login` | User login |
| GET | `/user/logout` | User logout |
| GET | `/auth/check` | Check authentication status |
| PUT | `/user/update` | Update user profile |

### Blog Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/blog` | Get all blogs |
| GET | `/blog/:id` | Get specific blog |
| GET | `/blog/user/:userId` | Get user's blogs |
| POST | `/blog/create` | Create new blog |
| PUT | `/blog/update/:id` | Update blog |
| DELETE | `/blog/delete/:id` | Delete blog |

### File Upload Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/profile/upload/:userId` | Upload profile picture |
| POST | `/blog/upload` | Upload blog image |

## 🔐 Authentication Flow

1. **Registration**: Users sign up with email, password, and full name
2. **Login**: Users authenticate with email and password
3. **JWT Token**: Server issues JWT token stored in HTTP-only cookies
4. **Protected Routes**: Frontend checks authentication status before accessing protected pages
5. **Logout**: Clears authentication cookies and redirects to home

## 🎨 UI/UX Features

- **Glassmorphism Design**: Modern glass-like UI elements with backdrop blur
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: CSS transitions and hover effects
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Dark Theme**: Elegant dark color scheme with gradient backgrounds

## 📱 Key Components

### Account Dashboard
- Profile information management
- Profile picture upload
- Blog statistics
- Blog management (view, delete)
- Logout functionality

### Blog Creation
- Rich text editor for blog content
- Image upload for blog posts
- Title and summary fields
- Real-time preview

### Blog Display
- Card-based blog layout
- Image thumbnails
- Excerpt previews
- Creation date display
- Author information

## 🔧 Development Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🗄️ Database Schema

### User Model
```javascript
{
  fullname: String (required),
  email: String (required, unique),
  password: String (hashed),
  profileImgUrl: String (default),
  role: String (enum: ["USER", "ADMIN"]),
  isActive: Boolean,
  failedLoginAttempts: Number,
  lockUntil: Date,
  timestamps: true
}
```

### Blog Model
```javascript
{
  userid: String,
  titalimg: String,
  title: String (required),
  description: String (required),
  createdby: String,
  summary: String
}
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or Vercel

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🐛 Known Issues

- Blog model filename has a typo (`bolg.js` instead of `blog.js`)
- Some console.log statements remain in production code
- Limited error handling in some components

## 🔮 Future Enhancements

- [ ] Add blog categories and tags
- [ ] Implement search functionality
- [ ] Add comment system
- [ ] Social media sharing
- [ ] Rich text editor for blog content
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Blog analytics
- [ ] Multi-language support 