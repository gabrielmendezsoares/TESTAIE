import { Request, Response, NextFunction } from 'express';

export const getTemplate = (
    req: Request, 
    _res: Response, 
    _next: NextFunction, 
    _timestamp: string
) => {
  return {
    status: 200,
    data: {
      status: true,
      statusCode: 200,
      path: req.originalUrl || req.url,
      method: req.method,
      message: 'Template service function called successfully.',
      suggestion: 'Modify this function to return the desired data.'
    }
  };
};
