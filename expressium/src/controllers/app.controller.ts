import { NextFunction, Request, RequestHandler, Response } from 'express';
import { dateTimeFormatterUtil } from '../utils';

/**
 * ## generateController
 * 
 * Generates a controller function for a given service function.
 * 
 * @description This function creates a standardized Express request handler that wraps service functions
 * with consistent error handling, logging, and response formatting. It implements the
 * Controller layer in the application's architecture, mediating between HTTP requests and
 * the business logic contained in service functions.
 * 
 * Key features of the generated controller:
 * 
 * - Performance monitoring: Logs execution time of each request using console.time/timeEnd
 * - Consistent formatting: Standardizes API responses across the application
 * - Error handling: Catches and processes all errors with appropriate status codes
 * - Audit logging: Records timestamps and service execution details
 * - Clean separation: Maintains separation between HTTP concerns and business logic
 * 
 * The controller handles three main scenarios:
 * 
 * 1. Successful execution: Returns service data with the specified status code
 * 2. Handled errors: Processes errors with custom status codes from the service
 * 3. Unhandled errors: Catches unexpected exceptions and returns a generic 500 error
 * 
 * @param service - The service function to be wrapped by this controller.
 * The service should be an async function that processes the request and returns
 * an object with a status code and data payload.
 * 
 * @returns An Express RequestHandler function that processes requests
 * through the service and handles the HTTP response lifecycle. This handler implements
 * the standard Express middleware signature (req, res, next).
 * 
 * @throws The controller itself doesn't throw errors, but instead catches them
 * and transforms them into appropriate HTTP responses with status code 500. Any errors
 * from the service function will be caught and handled uniformly.
 */
export const generateController = (service: Function): RequestHandler => {
  return async (
    req: Request, 
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const timestamp = dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date());
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
            suggestion: 'Please try again later. If this issue persists, contact our support team for assistance.'
          }
        );
    } finally {
      console.timeEnd(timer);
    }
  };
};
