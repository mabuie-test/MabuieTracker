// vehicleController.js
import { Vehicle } from '../models/Vehicle.js';

export const listVehicles = (req, res) => {
  const filter = req.user.role === 'user'
    ? { ownerId: req.user.id }
    : {};
  Vehicle.find(filter).then(v => res.json(v));
};

export const getVehicle = (req, res) =>
  Vehicle.findById(req.params.vehicleId)
    .then(v => v ? res.json(v) : res.sendStatus(404));

export const createVehicle = (req, res) =>
  new Vehicle(req.body).save().then(v => res.status(201).json(v));

export const updateVehicle = (req, res) =>
  Vehicle.findByIdAndUpdate(req.params.vehicleId, req.body, { new: true })
    .then(v => res.json(v));

export const deleteVehicle = (req, res) =>
  Vehicle.findByIdAndDelete(req.params.vehicleId)
    .then(() => res.json({ message: 'Eliminado' }));
