// routes/vehicles.js
import { Router } from 'express';
import { authenticateJWT, authorizeRoles, restrictToAssignedVehicles } from '../middlewares/authorizeRoles.js';
import * as ctrl from '../controllers/vehicleController.js';
const r = Router();
r.use(authenticateJWT);
r.get('/', authorizeRoles('admin','user'), ctrl.listVehicles);
r.post('/', authorizeRoles('admin'), ctrl.createVehicle);
r.get('/:vehicleId', authorizeRoles('admin','user'), restrictToAssignedVehicles, ctrl.getVehicle);
r.put('/:vehicleId', authorizeRoles('admin'), ctrl.updateVehicle);
r.delete('/:vehicleId', authorizeRoles('admin'), ctrl.deleteVehicle);
export default r;
