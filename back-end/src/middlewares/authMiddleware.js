const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.status(401).json({ message: 'Cabeçalho de autorização ausente' });

  const token = authHeader.split(' ')[1];
  if(!token) return res.status(401).json({ message: 'Token ausente' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token Invalido' });
  }
};
