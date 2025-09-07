# Social Media Application

A full-stack social media application built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (login/register)
- Create and view posts
- Like and comment on posts
- AI-powered image generation using Hugging Face
- Real-time updates with Socket.io
- Responsive design with Tailwind CSS

## Project Structure

```
├── server/          # Backend (Node.js/Express)
│   ├── src/
│   │   ├── models/     # MongoDB models
│   │   ├── routes/     # API routes
│   │   ├── config.js   # Configuration
│   │   ├── index.js    # Server entry point
│   │   └── sockets.js  # Socket.io setup
│   └── package.json
├── client/          # Frontend (React/Vite)
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── api/        # API client functions
│   │   └── App.jsx     # Main app component
│   └── package.json
└── README.md
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
MONGO_URI=mongodb://127.0.0.1:27017/sma

# Server Configuration
PORT=5000

# JWT Secret (change this to a secure random string in production)
JWT_SECRET=supersecret

# Hugging Face API Token (get your token from https://huggingface.co/settings/tokens)
HUGGINGFACE_API_TOKEN=your_huggingface_token_here
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- Hugging Face account (for image generation)

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000`

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The client will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post
- `POST /api/posts/:id/like` - Like/unlike a post
- `POST /api/posts/:id/comment` - Add a comment to a post

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/follow` - Follow/unfollow a user

### Image Generation
- `POST /api/image/generate` - Generate an image using AI

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Socket.io for real-time features
- Hugging Face API for image generation

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios for API calls
- Socket.io client

## Getting Started

1. Clone the repository
2. Set up the environment variables as described above
3. Install dependencies for both server and client
4. Start MongoDB
5. Run both server and client in development mode
6. Open `http://localhost:3000` in your browser

## Features in Detail

### User Authentication
- Secure registration and login
- JWT-based authentication
- Password hashing with bcryptjs

### Social Features
- Create, edit, and delete posts
- Like and unlike posts
- Comment on posts
- View user profiles

### AI Image Generation
- Generate images using Hugging Face's Stable Diffusion
- Download generated images

  

