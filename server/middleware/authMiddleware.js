const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 🔴 ADMIN (ENV BASED)
      if (decoded.id === 'admin' || decoded.isAdmin === true) {
        req.user = {
          id: 'admin',
          email: decoded.email || process.env.ADMIN_EMAIL,
          isAdmin: true,
        };
        return next();
      }

      // 🔵 NORMAL USER
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = {
        id: user.id,
        email: user.email,
        isAdmin: Boolean(user.isAdmin),
      };

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: 'Admin access denied' });
  }
};

module.exports = { protect, admin };
