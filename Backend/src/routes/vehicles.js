// src/routes/vehicles.js
import { Router } from 'express';

// Importar authenticateJWT do respetivo ficheiro
import { authenticateJWT } from '../middlewares/authenticateJWT.js';

// Importar authorizeRoles e restrictToAssignedVehicles de authorizeRoles.js
import { authorizeRoles, restrictToAssignedVehicles } from '../middlewares/authorizeRoles.js';

import * as ctrl from '../controllers/vehicleController.js';

const router = Router();

// Aplica autenticação a todas as rotas abaixo
router.use(authenticateJWT);

// Listar veículos (admin vê todos; user vê só os seus)
router.get('/', authorizeRoles('admin','user'), ctrl.listVehicles);

// Criar veículo (somente admin)
router.post('/', authorizeRoles('admin'), ctrl.createVehicle);

// Ver detalhes de um veículo (admin ou user, mas user limitado aos seus veículos)
router.get('/:vehicleId',
  authorizeRoles('admin','user'),
  restrictToAssignedVehicles,
  ctrl.getVehicle
);

// Atualizar veículo (somente admin)
router.put('/:vehicleId', authorizeRoles('admin'), ctrl.updateVehicle);

// Eliminar veículo (somente admin)
router.delete('/:vehicleId', authorizeRoles('admin'), ctrl.deleteVehicle);

export default router;
