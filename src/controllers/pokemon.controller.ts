import { getPokemons } from '../services/pokemon.service';
import { Response } from 'express';
import { INTERNAL_ERROR } from '../utils/constants/error.handle';
import { response } from '../services/response.service';
import { handleHttp } from '../utils/error.handle';
import { RequestExt } from '../interfaces/http.interface';

const getPokemonsCtrl = async (req: RequestExt, res: Response) => {
  try {
    const { limit, offset } = req.query;

    if (limit && offset) {
      const pokemons = await getPokemons({ limit: +limit, offset: +offset });
      return response(res, pokemons);
    }
    const pokemons = await getPokemons();
    return response(res, pokemons);
  } catch (error) {
    console.error(error);
    handleHttp(res, INTERNAL_ERROR);
  }
};

export { getPokemonsCtrl };
