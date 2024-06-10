import { Router } from 'express';
import {
  getUsersCtrl,
  getPokemonsByUserCtrl,
  savePokemonCtrl,
  deletePokemonCtrl,
} from '../controllers/user.controller';
import { checkJwt } from '../middlewares/session';
const router = Router();

router.get('/', checkJwt, getUsersCtrl);
router.get('/favorites/:iduser', checkJwt, getPokemonsByUserCtrl);
router.post('/favorites', checkJwt, savePokemonCtrl);
router.delete('/favorites/:idpokemon', checkJwt, deletePokemonCtrl);

export { router };
