import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import {
  getUsers,
  getPokemonsByUser,
  savePokemon,
  deletePokemon,
} from '../services/user.service';
import { response } from '../services/response.service';
import { INTERNAL_ERROR } from '../utils/constants/error.handle';
import { RequestExt } from '../interfaces/http.interface';
import { JwtPayload } from 'jsonwebtoken';

const getUsersCtrl = async (_req: Request, res: Response) => {
  try {
    const responseUser = await getUsers();
    return response(res, responseUser);
  } catch (error) {
    console.error(error);
    handleHttp(res, INTERNAL_ERROR);
  }
};

const getPokemonsByUserCtrl = async ({ params }: Request, res: Response) => {
  try {
    const { iduser } = params;
    const userPokemons = await getPokemonsByUser(iduser);
    return response(res, userPokemons);
  } catch (error) {
    console.error(error);
    handleHttp(res, INTERNAL_ERROR);
  }
};

const savePokemonCtrl = async (req: RequestExt, res: Response) => {
  try {
    const { id } = req.user as JwtPayload;
    req.body.user = id;
    const responseUser = await savePokemon(req.body);
    if (responseUser.error) {
      return handleHttp(res, responseUser);
    }
    return response(res, responseUser.data, 'Pokemon saved successfully', 201);
  } catch (error) {
    console.error(error);
    handleHttp(res, INTERNAL_ERROR);
  }
};

const deletePokemonCtrl = async (req: RequestExt, res: Response) => {
  try {
    const { idpokemon } = req.params;
    const responseUser = await deletePokemon(idpokemon);
    return response(res, responseUser);
  } catch (error) {
    console.error(error);
    handleHttp(res, INTERNAL_ERROR);
  }
};

export {
  getUsersCtrl,
  getPokemonsByUserCtrl,
  savePokemonCtrl,
  deletePokemonCtrl,
};
