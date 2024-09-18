const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Create Express app
const app = express();
const PORT = 5000;
const SECRET_KEY = 'supersecretkey';

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/connectify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Middleware to authenticate user using JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Signup route
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Save the new user
  const user = new User({ email, password: hashedPassword });
  await user.save();
  
  res.status(201).json({ message: 'User registered successfully' });
});

// Signin route
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  
  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
  
  // Set token in cookie
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  res.status(200).json({ message: 'Login successful' });
});

// Logout route
app.post('/api/logout', (req, res) => {
  // Clear token cookie
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out' });
});

// Example protected route
app.get('/api/user', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user) return res.sendStatus(404);
  
  res.json({ username: user.email }); // or any other user details
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});