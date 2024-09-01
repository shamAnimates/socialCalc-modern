const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      console.error('No Authorization header');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.error('No token found in header');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    if (!decoded || !decoded.id) {
      console.error('Invalid token structure:', decoded);
      return res.status(401).json({ message: 'Token is not valid' });
    }

    
    const user = await User.findById(decoded.id);
    if (!user) {
      console.error('User not found');
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
