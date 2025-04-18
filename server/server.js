const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// For production deployment on Vercel
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the frontend build
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  // Handle all other routes by serving the index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));

// For Vercel serverless deployment
module.exports = app;