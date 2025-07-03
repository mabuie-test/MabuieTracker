// src/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ base de dados conectada');
  } catch (err) {
    console.error('❌ Erro MongoDB:', err);
    process.exit(1);
  }
};
