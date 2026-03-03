require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const { securityHeaders, limiter } = require('./middleware/security');
const authRoutes = require('./routes/authRoutes');
const archiveRoutes = require('./routes/archiveRoutes');
const fs = require('fs');

// 1. Ensure upload directory exists
if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data');
}

// 2. Connect to Database
connectDB();

const app = express();

// 3. Base Security Middleware
app.use(securityHeaders);
app.use(limiter);

// 4. Allowed Origins Setup
// We use an array so you can test locally while the site is deployed.
// Make sure process.env.HOSTLINK does NOT have a trailing slash (e.g. "https://talkflow.vercel.app")
const allowedOrigins =[
  'http://localhost:3000',
  process.env.HOSTLINK 
].filter(Boolean); // Filters out undefined if env variable is missing

// 5. CORS Setup (🚨 MUST BE BEFORE ROUTES AND BODY PARSERS 🚨)
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like server-to-server or postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log(`Blocked by CORS: ${origin}`); // Helps you debug if the URL is slightly wrong
      return callback(new Error('CORS block: This origin is not allowed'), false);
    }
  },
  credentials: true // Crucial for JWT HttpOnly Cookies
}));

// 6. Body Parsers & Cookie Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 7. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/archives', archiveRoutes);

// 8. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`TalkFlow Server running on port ${PORT}`));