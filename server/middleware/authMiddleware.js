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

      // ✅ ENV ADMIN (NO DB REQUIRED)
      if (decoded.id === 'admin') {
        req.user = {
          id: 'admin',
          email: process.env.ADMIN_EMAIL,
          isAdmin: true,
        };
        return next();
      }

      // ✅ NORMAL USER
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
    } catch (err) {
      return res.status(401).json({ message: 'Token invalid' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

const admin = (req, res, next) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    return res.status(403).json({ message: 'Admin only route' });
  }
};

module.exports = { protect, admin };
