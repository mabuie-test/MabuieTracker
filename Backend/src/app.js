// src/app.js
import express from 'express';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import vehicleRoutes from './routes/vehicles.js';

const app = express();
connectDB();
app.use(express.json(), morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.get('/', (_,res) => res.json({ message: 'OK' }));
export default app;
