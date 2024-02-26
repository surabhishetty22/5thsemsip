const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.once('open', () => {
  console.log('Connected to MongoDB Atlas');

  // Middleware
  app.use(express.json());

  // Routes
  const userRoutes = require('./routes/userRoutes');
  const foodRoutes = require('./routes/foodRoutes');
  const orderRoutes = require('./routes/orderRoutes');

  app.use('/api/users', userRoutes);
  app.use('/api/foods', foodRoutes);
  app.use('/api/orders', orderRoutes);

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
