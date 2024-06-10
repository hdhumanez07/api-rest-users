import { Router } from 'express';
import { getPokemonsCtrl } from '../controllers/pokemon.controller';
const router = Router();

router.get('/', getPokemonsCtrl);

export { router };
