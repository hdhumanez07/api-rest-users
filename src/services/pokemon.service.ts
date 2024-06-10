//?limit=100&offset=200
import { IQueryParams, addQueryParams } from '../utils/calls';

const getPokemons = async (params: object) => {
  const queryParams = addQueryParams(params as IQueryParams<object>);
  const pokemones = await fetch(
    `${process.env.POKEMON_API_URL}/pokemon${queryParams}`,
  );
  const data = await pokemones.json();
  return data;
};

export { getPokemons };
