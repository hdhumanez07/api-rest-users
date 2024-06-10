import { NextFunction, Response } from 'express';
import { verifyToken } from '../utils/jwt.handle';
import { handleHttp } from '../utils/error.handle';
import { ERROR_HANDLE } from '../utils/constants/error.handle';
import { RequestExt } from '../interfaces/http.interface';
const { INVALID_TOKEN } = ERROR_HANDLE;

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization;
    const jwt = jwtByUser?.split(' ')[1];
    const isUser = verifyToken(`${jwt}`);
    if (!isUser) {
      return handleHttp(res, { error: INVALID_TOKEN.KEY });
    } else {
      req.user = isUser;
      next();
    }
  } catch (error) {
    return handleHttp(res, { error: INVALID_TOKEN.KEY });
  }
};

export { checkJwt };
