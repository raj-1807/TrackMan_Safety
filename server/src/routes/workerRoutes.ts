import { Router } from 'express';
import { getWorkers, getWorker, updateWorkerStatus, getWorkerLocationHistory } from '../controllers/workerController';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '@prisma/client';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', getWorkers);
router.get('/:id', getWorker);
router.put('/:id/status', authorize(Role.SUPERVISOR, Role.CONTROL_ROOM), updateWorkerStatus);
router.get('/:id/location-history', getWorkerLocationHistory);

export default router;
