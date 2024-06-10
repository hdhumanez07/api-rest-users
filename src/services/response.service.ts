import { Response } from 'express';

const response = <T>(
  res: Response,
  data: T,
  info = 'Query do it successfully',
  code = 200,
) => {
  return res.status(code).json({
    success: true,
    info,
    data,
  });
};

const responseFailed = <T>(
  res: Response,
  info = 'Not found',
  code = 404,
  data?: T,
) => {
  return res.status(code).json({
    success: false,
    info,
    data,
  });
};

export { response, responseFailed };
