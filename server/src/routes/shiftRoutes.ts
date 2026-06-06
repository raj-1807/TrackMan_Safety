import { Router } from 'express';
import { checkIn, checkOut, getShifts } from '../controllers/shiftController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.post('/check-in', checkIn);
router.put('/check-out', checkOut);
router.get('/', getShifts);

export default router;
