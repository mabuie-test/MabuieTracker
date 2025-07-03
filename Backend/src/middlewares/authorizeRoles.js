export const authorizeRoles = (...allowed) => (req, res, next) => {
  if (!allowed.includes(req.user.role))
    return res.status(403).json({ message: 'Acesso proibido' });
  next();
};

export const restrictToAssignedVehicles = (req, res, next) => {
  if (req.user.role === 'admin') return next();
  const vid = req.params.vehicleId;
  if (!req.user.assignedVehicles.includes(vid))
    return res.status(403).json({ message: 'Veículo não autorizado' });
  next();
};
