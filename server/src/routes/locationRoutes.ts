import { Router } from 'express';
import { updateLocation, getLatestLocations, getLocationHistory } from '../controllers/locationController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.post('/', updateLocation);
router.get('/latest', getLatestLocations);
router.get('/history/:workerId', getLocationHistory);

export default router;
