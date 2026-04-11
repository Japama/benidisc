const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT secret not configured in environment');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    console.error('JWT verification error:', error && error.message);
    // For debugging, decode token payload (unsafe to expose to clients)
    try {
      const decoded = jwt.decode(token, { complete: true });
      console.error('Decoded token (no verification):', decoded);
    } catch (e) {
      console.error('Failed to decode token for debug');
    }

    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = { authenticateToken };
