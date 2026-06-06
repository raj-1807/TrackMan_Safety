import { Router } from 'express';
import { getZones, getZone, createZone, updateZone, deleteZone } from '../controllers/zoneController';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.get('/', getZones);
router.get('/:id', getZone);
router.post('/', authorize(Role.SUPERVISOR, Role.CONTROL_ROOM), createZone);
router.put('/:id', authorize(Role.SUPERVISOR, Role.CONTROL_ROOM), updateZone);
router.delete('/:id', authorize(Role.SUPERVISOR, Role.CONTROL_ROOM), deleteZone);

export default router;
