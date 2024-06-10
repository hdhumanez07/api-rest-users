import { getDepartments } from '../services/department.service';
import { response } from '../services/response.service';
import { INTERNAL_ERROR } from '../utils/constants/error.handle';
import { handleHttp } from '../utils/error.handle';
import { Request, Response } from 'express';

const getDepartmentsCtrl = async (_req: Request, res: Response) => {
  try {
    const responseDepartment = await getDepartments();
    return response(res, responseDepartment);
  } catch (error) {
    console.error(error);
    handleHttp(res, INTERNAL_ERROR);
  }
};

export { getDepartmentsCtrl };
