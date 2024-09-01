const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); 
const User = require('./models/User');
const jwt = require('jsonwebtoken');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/spreadsheets', require('./routes/spreadsheetRoutes'));


//register
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//spreadsheet
app.use('/api/spreadsheets', require('./routes/spreadsheetRoutes'));

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server running on port ${PORT})'));