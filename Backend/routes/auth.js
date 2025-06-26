const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Serve static files for uploaded images
const expressApp = require('express')();
expressApp.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

router.post('/signup', upload.single('profilePhoto'), async (req, res) => {
  const { username, password, role, age } = req.body;
  let profilePhoto = req.file ? `/uploads/${req.file.filename}` : undefined;

  if (!username || !password || !role || !age) {
    return res.status(400).json({ error: 'Username (email), password, role, and age are required' });
  }
  if (isNaN(age) || Number(age) <= 18) {
    return res.status(400).json({ error: 'Age must be greater than 18' });
  }

  try {
    // Create and save the new user with both email and username set
    const newUser = new User({
      email: username, // Assuming username is actually the email
      username: username.split('@')[0], // Use part of email as username or set differently
      password,
      role,
      age,
      profilePhoto
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.code === 11000) { // Handle duplicate key error
      return res.status(409).json({ error: 'User with this email already exists' });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: 'Server error' });
  }
});


router.get('/profile', authMiddleware, (req, res) => {
  res.send(req.user);
});

module.exports = router;

