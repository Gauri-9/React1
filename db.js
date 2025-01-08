const mongoose = require('mongoose');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/roomrent'; // Replace with your MongoDB URI if using a cloud service

// Mongoose connection
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;
