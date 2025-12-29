const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    if (!req.headers.authorization?.startsWith('Bearer')) {
      return res.status(401).json({ message: 'No token' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔐 ADMIN FROM ENV
    if (decoded.id === 'admin') {
      req.user = {
        id: 'admin',
        isAdmin: true,
      };
      return next();
    }

    // 👤 NORMAL USER
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      id: user.id,
      isAdmin: user.isAdmin === true,
    };

    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    res.status(401).json({ message: 'Token failed' });
  }
};

const admin = (req, res, next) => {
  if (req.user?.isAdmin === true) {
    return next();
  }
  return res.status(403).json({ message: 'Admin only route' });
};

module.exports = { protect, admin };
