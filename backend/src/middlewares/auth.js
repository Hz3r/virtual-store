// middlewares/auth.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.header('x-authorization');

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado, token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, 'secreto');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token no válido' });
  }
};
