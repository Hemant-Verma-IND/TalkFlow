const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  const userExists = await User.findOne({ 
    $or: [{ email: email.toLowerCase() }, { username }] 
  });

  if (userExists) {
    return res.status(400).json({ 
      message: 'User already exists with this email or username' 
    });
  }

  const user = await User.create({
    username,
    email: email.toLowerCase(),
    password
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, username: user.username, email: user.email });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
}; // Removed the extra }; that was here

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Use toLowerCase() to match the registered email format
  const user = await User.findOne({ email: email.toLowerCase() });

  if (user && (await user.comparePassword(password))) {
    generateToken(res, user._id);
    res.json({ _id: user._id, username: user.username, email: user.email });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const getUserProfile = async (req, res) => {
  res.json(req.user);
};

module.exports = { registerUser, loginUser, logoutUser, getUserProfile };