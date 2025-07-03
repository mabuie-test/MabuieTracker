// routes/users.js
import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middlewares/authorizeRoles.js';
import * as ctrl from '../controllers/userController.js';
const r = Router();
r.use(authenticateJWT, authorizeRoles('admin'));
r.get('/', ctrl.listUsers);
r.get('/:id', ctrl.getUser);
r.put('/:id', ctrl.updateUser);
r.delete('/:id', ctrl.deleteUser);
export default r;
