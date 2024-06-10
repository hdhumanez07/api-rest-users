import { Request, Response } from 'express';
import { registerNewUser, loginUser } from '../services/auth.service';
import { response } from '../services/response.service';
import { handleHttp } from '../utils/error.handle';
import { INTERNAL_ERROR } from '../utils/constants/error.handle';

const registerCtrl = async ({ body }: Request, res: Response) => {
  try {
    console.log(body);
    const responseUser = await registerNewUser({
      ...body,
      birthday: new Date(body.birthday),
    });

    if (responseUser.error) {
      return handleHttp(res, responseUser);
    }
    return response(res, responseUser.data, 'User created successfully', 201);
  } catch (error: unknown) {
    return handleHttp(res, INTERNAL_ERROR);
  }
};

const loginCtrl = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body;

    const responseUser = await loginUser({ email, password });
    if (responseUser.error) {
      return handleHttp(res, responseUser);
    }
    return response(res, responseUser, 'User logged in successfully');
  } catch (error: unknown) {
    console.error(error);
    return handleHttp(res, INTERNAL_ERROR);
  }
};

export { loginCtrl, registerCtrl };
