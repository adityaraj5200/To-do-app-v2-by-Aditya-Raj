// Middleware to verify JWT token
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

module.exports = { requireAuth };
