const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const apiRoutes = require('./routes/api');

// Middleware
app.use(express.json());
app.use(cors());

// Connect to mongodb
// Connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/tic-tac-toe', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
// Define your API routes here
app.use('/game', apiRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
