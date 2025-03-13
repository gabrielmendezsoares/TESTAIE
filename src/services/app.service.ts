import { Request, Response, NextFunction } from 'express';
import { IResponse, IResponseData } from '../../expressium/src';

export const getTemplate = (
    req: Request, 
    _res: Response, 
    _next: NextFunction, 
    timestamp: string
): IResponse.IResponse<IResponseData.IResponseData> => {
  return {
    status: 200,
    data: {
      status: true,
      statusCode: 200,
      timestamp,
      path: req.originalUrl || req.url,
      method: req.method,
      message: 'This is a template response.',
      suggestion: 'Please replace this with your own implementation.'
    }
  };
};
