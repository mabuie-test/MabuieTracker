import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateJWT = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) 
    return res.status(401).json({ message: 'Token não fornecido' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role, assignedVehicles: payload.assignedVehicles };
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
};
