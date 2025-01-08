const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path if necessary
const cors = require('cors'); // Import CORS


const app = express();
const PORT = 5002;

// Middleware to parse JSON data
app.use(cors()); // Enable CORS

// app.use(cors({
//   origin: : 'https://room-rent-project-1.onrender.com', // Replace with your frontend URL
// }));

app.use(express.json());



//
//nHNXLhOWV4CUGuYB     mongodb+srv://gauribakal11:nHNXLhOWV4CUGuYB@cluster0.pdoue.mongodb.net/

// MongoDB connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/roomrent';


mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Room Rent API!');
});

// Route to register a new user
app.post('/register', async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword, role } = req.body;

    // Validate that confirmPassword matches password
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Create and save the user
    const newUser = new User({ fullname, email, password, confirmPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});


// Route to login a user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Successful login response
    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



// Route to get all users (for demonstration)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

