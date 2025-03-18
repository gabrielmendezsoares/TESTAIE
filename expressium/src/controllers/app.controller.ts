import { NextFunction, Request, RequestHandler, Response } from 'express';
import { dateTimeFormatterUtil } from '../utils';

/**
 * ## generateController
 * 
 * Generates a controller function that wraps service functions with standardized request handling.
 * 
 * @description This function creates a standardized Express request handler that wraps service functions
 * with consistent error handling, logging, and response formatting. It implements the
 * Controller layer in the application's architecture, mediating between HTTP requests and
 * the business logic contained in service functions.
 * 
 * ### Key features of the generated controller:
 * 
 * - Performance monitoring: Logs execution time of each request using console.time/timeEnd
 * - Consistent formatting: Standardizes API responses across the application
 * - Error handling: Catches and processes all errors with appropriate status codes
 * - Audit logging: Records timestamps and service execution details
 * - Clean separation: Maintains separation between HTTP concerns and business logic
 * - Standardized response structure: Ensures consistent response format across all endpoints
 * 
 * ### Controller execution flow:
 * 
 * 1. Generate timestamp for request tracking and performance measurement
 * 2. Start performance timer for the request
 * 3. Execute the service function with request parameters and timestamp
 * 4. Process the service response (status code and data)
 * 5. Send formatted HTTP response to the client
 * 6. Handle any exceptions that occur during service execution
 * 7. Log performance metrics when execution completes
 * 
 * ### The controller handles three main scenarios:
 * 
 * 1. Successful execution: Returns service data with the specified status code
 * 2. Handled errors: Processes errors with custom status codes from the service
 * 3. Unhandled errors: Catches unexpected exceptions and returns a generic 500 error.
 * 
 * ### Response format:
 * 
 * - Success responses: `{ data: { status: true, statusCode: XXX, ... } }`
 * - Error responses: `{ data: { status: false, statusCode: 500, timestamp, path, method, message, suggestion } }`
 * 
 * ### Logging behavior:
 * 
 * - Performance: Logs execution time for each controller invocation
 * - Errors: Logs detailed error information including service name, timestamp, and error message
 * - Format: Uses consistent log format for easy parsing and monitoring
 * 
 * @param serviceHandler - The service function to be wrapped by this controller.
 * Must be an async function that accepts (req, res, next, timestamp) parameters
 * and returns an object with `status` (HTTP status code) and `data` (response payload) properties.
 *
 * @returns An Express RequestHandler function that processes requests
 * through the service and handles the HTTP response lifecycle.
 * This handler implements the standard Express middleware signature (req, res, next).
 * 
 * @throws The controller itself doesn't throw errors, but instead catches them
 * and transforms them into appropriate HTTP responses with status code 500.
 * All errors from the service function will be caught, logged, and handled uniformly.
 */
export const generateController = (serviceHandler: Function): RequestHandler => {
  return async (
    req: Request, 
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const timestamp = dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date());
    const timer = `Controller | Timestamp: ${ timestamp } | Service Name: ${ serviceHandler.name }`;
    
    console.time(timer);
    
    try {
      const { status, data } = await serviceHandler(req, res, next, timestamp);
      
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
