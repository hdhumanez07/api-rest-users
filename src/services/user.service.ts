import UserModel from '../models/user.model';
import PokemonModel from '../models/pokemon.model';
import { IPokemon } from '../interfaces/pokemon.interface';
import { ERROR_HANDLE } from '../utils/constants/error.handle';
import { validatePokemon } from '../schemas/pokemon.schema';
const { POKEMON_ALREADY_EXISTS, INVALID_PAYLOAD } = ERROR_HANDLE;

const getUsers = async () => {
  const users = await UserModel.find()
    .select('-password')
    .populate('city department');
  return users;
};
const getPokemonsByUser = async (iduser: string) => {
  const pokemons = await PokemonModel.find({ user: iduser });
  return pokemons;
};

const savePokemon = async (data: IPokemon) => {
  const exist = await PokemonModel.findOne({
    name: data.name,
    user: data.user,
  });
  if (exist) {
    return {
      error: POKEMON_ALREADY_EXISTS.KEY,
    };
  }
  const validatePayload = validatePokemon(data);

  if (!validatePayload.success) {
    return {
      error: INVALID_PAYLOAD.KEY,
      data: validatePayload.error.message,
    };
  }

  const newPokemon = await PokemonModel.create(data);
  return {
    data: newPokemon,
  };
};

const deletePokemon = async (idpokemon: string) => {
  const pokemon = await PokemonModel.findByIdAndDelete(idpokemon);
  return pokemon;
};

export { getUsers, getPokemonsByUser, savePokemon, deletePokemon };
