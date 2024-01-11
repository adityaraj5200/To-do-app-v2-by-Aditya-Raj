// Middleware to verify JWT token
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Authorization token required' });
  
    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token expired' });
        }
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // 'user' here below is _id, because that was payload sent during token generation. // jwt.sign({ _id }, secretKey, { expiresIn: '3d' });
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Error in requireAuth middleware:', error.message);
  }
};

module.exports = { requireAuth };