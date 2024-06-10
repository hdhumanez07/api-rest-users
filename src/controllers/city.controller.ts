import { getCities } from '../services/city.service';
import { response } from '../services/response.service';
import { INTERNAL_ERROR } from '../utils/constants/error.handle';
import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';

const getCitiesCtrl = async (_req: Request, res: Response) => {
  try {
    const responseCity = await getCities();
    return response(res, responseCity);
  } catch (error) {
    console.error(error);
    handleHttp(res, INTERNAL_ERROR);
  }
};

export { getCitiesCtrl };
