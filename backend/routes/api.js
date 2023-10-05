const express = require('express');
const router = express.Router();
const Game = require('../models/game');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passportConfig = require('../config/passport'); // Passport configuration file (see below)

// Create a new game
router.post('/game-details', async (req, res) => {
  try {
    const { playerX, playerO, gameState } = req.body;
    const game = new Game({ playerX, playerO, gameState });
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new user
router.post('/register', async (req, res) => {
    try {
      const { username, password, email } = req.body;
  
      // Check if the username or email already exists in the database
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
  
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists. Try logging in.' });
      }
  
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user with the hashed password
      const newUser = new User({ username, password: hashedPassword, email });
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // User Login
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
  
      // If authentication is successful, generate a JWT token
      const token = jwt.sign({ username: user.username }, 'your-secret-key', {
        expiresIn: '1h', // Token expiration time
      });
  
      return res.json({ token });
    })(req, res, next);
  });
  
  
  // User Verification (protected route)
  router.get('/verify', passport.authenticate('jwt', { session: false }), (req, res) => {
    // If the JWT is valid, the user is authenticated
    res.json({ message: 'User authenticated' });
  });

  
module.exports = router;
