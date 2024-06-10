import { Router } from 'express';
import { getDepartmentsCtrl } from '../controllers/department.controller';
const router = Router();

router.get('/', getDepartmentsCtrl);

export { router };
