//?limit=100&offset=200
import { addQueryParams } from '../utils/calls';

const getPokemons = async (params?: { limit: number; offset: number }) => {
  const queryParams = params ? addQueryParams(params) : '';
  const pokemones = await fetch(
    `${process.env.POKEMON_API_URL}/pokemon${queryParams}`,
  );
  const data = await pokemones.json();
  return data;
};

export { getPokemons };
