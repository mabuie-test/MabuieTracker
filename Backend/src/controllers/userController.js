// userController.js
import { User } from '../models/User.js';

export const listUsers = (req, res) =>
  User.find().select('-passwordHash').then(u => res.json(u));

export const getUser = (req, res) =>
  User.findById(req.params.id).select('-passwordHash')
    .then(u => u ? res.json(u) : res.sendStatus(404));

export const updateUser = (req, res) =>
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .select('-passwordHash').then(u => res.json(u));

export const deleteUser = (req, res) =>
  User.findByIdAndDelete(req.params.id).then(() => res.json({ message: 'Removido' }));
