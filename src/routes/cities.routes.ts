import { Router } from 'express';
import { getCitiesCtrl } from '../controllers/city.controller';
const router = Router();

router.get('/', getCitiesCtrl);

export { router };
