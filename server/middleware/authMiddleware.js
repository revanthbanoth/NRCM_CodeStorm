const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * ===============================
 * PROTECT MIDDLEWARE
 * ===============================
 */
const protect = async (req, res, next) => {
  let token;

  // Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ ADMIN (ENV BASED LOGIN)
      if (decoded.id === 'admin') {
        req.user = {
          id: 'admin',
          name: 'Admin',
          email: process.env.ADMIN_EMAIL,
          isAdmin: true,
        };
        return next();
      }

      // ✅ NORMAL USER (DATABASE)
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false,
      };

      return next();
    } catch (error) {
      console.error('JWT error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};

/**
 * ===============================
 * ADMIN MIDDLEWARE
 * ===============================
 */
const admin = (req, res, next) => {
  // ✅ Allow ENV admin
  if (req.user?.id === 'admin') {
    return next();
  }

  // ✅ Allow DB admin
  if (req.user?.isAdmin === true) {
    return next();
  }

  return res.status(403).json({ message: 'Admin access denied' });
};

module.exports = { protect, admin };
