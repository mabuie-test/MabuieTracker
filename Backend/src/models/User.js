import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role:     { type: String, enum: ['admin','user'], default: 'user' },
  assignedVehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }]
}, { timestamps: true });

// Antes de guardar: hash da password
schema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

schema.methods.comparePassword = function(pw) {
  return bcrypt.compare(pw, this.passwordHash);
};

export const User = mongoose.model('User', schema);
