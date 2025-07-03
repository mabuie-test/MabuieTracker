// authController.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const signToken = (user) => jwt.sign(
  { sub: user._id, role: user.role, assignedVehicles: user.assignedVehicles },
  process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN }
);

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, passwordHash: password });
  await user.save();
  res.status(201).json({ message: 'Utilizador criado' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: 'Credenciais inválidas' });
  const token = signToken(user);
  res.json({ token });
};
