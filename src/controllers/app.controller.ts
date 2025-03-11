import { NextFunction, Request, RequestHandler, Response } from 'express';
import { dateFormatterUtil } from '../utils';

/**
 * ## generateController
 * 
 * Generates a controller function for a given service function.
 * 
 * @description Creates a standardized Express request handler that:
 *  - Logs execution time with timestamps
 *  - Calls the provided service function
 *  - Handles successful responses by returning the service's data
 *  - Catches and processes errors with appropriate error responses
 * 
 * @param service - The service function to be wrapped by this controller.
 * 
 * @returns An Express RequestHandler function that processes requests through the service.
 */
export const generateController = (service: Function): RequestHandler => {
  return async (
    req: Request, 
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const timestamp = dateFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date());
    const timer = `Controller | Timestamp: ${ timestamp } | Service: ${ service.name }`;
    
    console.time(timer);
    
    try {
      const { status, data } = await service(req, res, next, timestamp);
      
      res.status(status).json({ data });
    } catch (error: unknown) {
      console.log(`Controller | Timestamp: ${ timestamp } | Error: ${ error instanceof Error ? error.message : String(error) }`);
      
      res
        .status(500)
        .json(
          { 
            status: false,
            statusCode: 500,
            timestamp,
            path: req.originalUrl || req.url,
            method: req.method,
            message: 'Something went wrong.',
            suggestion: 'Try again later or contact support if the problem persists.'
          }
        );
    } finally {
      console.timeEnd(timer);
    }
  };
};
