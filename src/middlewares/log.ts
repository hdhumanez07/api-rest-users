import { Request, Response, NextFunction } from 'express';

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Request logged:', req.method, req.path);
  next();
};

export { logMiddleware };
