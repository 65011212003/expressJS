require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemsRouter = require('./routes/items');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/item-crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/items', itemsRouter);

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Items CRUD API' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 