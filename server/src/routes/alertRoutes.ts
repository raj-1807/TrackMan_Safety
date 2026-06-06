import { Router } from 'express';
import { getAlerts, triggerSOS, acknowledgeAlert, resolveAlert } from '../controllers/alertController';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticate);

router.get('/', getAlerts);
router.post('/sos', triggerSOS); // Any authenticated user can trigger SOS
router.put('/:id/acknowledge', authorize(Role.SUPERVISOR, Role.CONTROL_ROOM), acknowledgeAlert);
router.put('/:id/resolve', authorize(Role.SUPERVISOR, Role.CONTROL_ROOM), resolveAlert);

export default router;
