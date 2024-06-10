import UserModel from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import PokemonModel from '../models/pokemon.model';
import { IPokemon } from '../interfaces/pokemon.interface';
import { ERROR_HANDLE } from '../utils/constants/error.handle';
const { POKEMON_ALREADY_EXISTS } = ERROR_HANDLE;

const getUsers = async () => {
  const users = await UserModel.find()
    .select('-password')
    .populate('city department');
  return users;
};

const getUser = async (id: string) => {
  const user = await UserModel.findById(id);
  return user;
};

const createUser = async (user: IUser) => {
  const newUser = await UserModel.create(user);
  return newUser;
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
  const newPokemon = await PokemonModel.create(data);
  return {
    data: newPokemon,
  };
};

const deletePokemon = async (idpokemon: string) => {
  const pokemon = await PokemonModel.findByIdAndDelete(idpokemon);
  return pokemon;
};

export {
  getUser,
  createUser,
  getUsers,
  getPokemonsByUser,
  savePokemon,
  deletePokemon,
};
