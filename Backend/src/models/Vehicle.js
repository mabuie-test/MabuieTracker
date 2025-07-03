import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  plateNumber: { type: String, required: true, unique: true, trim: true },
  model:       { type: String, trim: true },
  ownerId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lastPosition: {
    lat: Number,
    lng: Number,
    speed: Number,
    timestamp: Date
  }
}, { timestamps: true });

export const Vehicle = mongoose.model('Vehicle', schema);
