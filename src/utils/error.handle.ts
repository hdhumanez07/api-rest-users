import { Response } from 'express';
import { responseFailed } from '../services/response.service';
import { ERROR_HANDLE } from './constants/error.handle';

const {
  USER_ALREADY_EXISTS,
  INVALID_PAYLOAD,
  INTERNAL_SERVER_ERROR,
  USER_NOT_FOUND,
  INCORRECT_PASSWORD,
  INVALID_TOKEN,
  POKEMON_ALREADY_EXISTS,
} = ERROR_HANDLE;

interface HandleError<T> {
  error: string;
  data?: T;
}

const handleHttp = <T>(res: Response, handle: HandleError<T>) => {
  switch (handle.error) {
    case USER_ALREADY_EXISTS.KEY:
      return responseFailed(
        res,
        USER_ALREADY_EXISTS.MESSAGE,
        USER_ALREADY_EXISTS.CODE,
        handle.data,
      );

    case POKEMON_ALREADY_EXISTS.KEY:
      return responseFailed(
        res,
        POKEMON_ALREADY_EXISTS.MESSAGE,
        POKEMON_ALREADY_EXISTS.CODE,
        handle.data,
      );

    case INVALID_PAYLOAD.KEY:
      return responseFailed(
        res,
        INVALID_PAYLOAD.MESSAGE,
        INVALID_PAYLOAD.CODE,
        handle.data ? JSON.parse(handle.data as unknown as string) : undefined,
      );

    case USER_NOT_FOUND.KEY:
      return responseFailed(res, USER_NOT_FOUND.MESSAGE, USER_NOT_FOUND.CODE);

    case INCORRECT_PASSWORD.KEY:
      return responseFailed(
        res,
        INCORRECT_PASSWORD.MESSAGE,
        INCORRECT_PASSWORD.CODE,
      );

    case INVALID_TOKEN.KEY:
      return responseFailed(res, INVALID_TOKEN.MESSAGE, INVALID_TOKEN.CODE);

    case INTERNAL_SERVER_ERROR.KEY:
      return responseFailed(
        res,
        INTERNAL_SERVER_ERROR.MESSAGE,
        INTERNAL_SERVER_ERROR.CODE,
      );

    default:
      return responseFailed(
        res,
        INTERNAL_SERVER_ERROR.MESSAGE,
        INTERNAL_SERVER_ERROR.CODE,
      );
  }
};

export { handleHttp };
