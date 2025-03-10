import { Request, Response } from 'express';
import { appService } from '../services';
import { dateFormatterUtil } from '../utils';

/**
 * @describe Generates a controller function for a given service name.
 * 
 * @description This function generates a controller function that handles requests for a specific service.
 * The controller function calls the service handler function and sends the response back to the client.
 * 
 * @param name - The controller name.
 * @param service - The service handler function.
 * 
 * @returns A controller function that handles the service request.
 */
const generateController = (
  name: string,
  service: Function
): (req: Request, res: Response) => Promise<void> => {
  return async (
    req: Request, 
    res: Response
  ): Promise<void> => {
    const timestamp = dateFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date());
    const timer = `Controller | Timestamp: ${ timestamp } | Service: ${ name }`;
    
    console.time(timer);
    
    try {
      const { status, data } = await service(req, timestamp);
      
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

/**
 * @describe Controller for the getAuthentication service.
 * 
 * @description This controller handles the getAuthentication service, which retrieves
 * the current user's authentication information.
 */
export const getAuthentication = generateController('getAuthentication', appService.getAuthentication);

/**
 * @describe Controller for the getAuthorization service.
 * 
 * @description This controller handles the getAuthorization service, which retrieves
 * the current user's authorization information.
 */
export const getAuthorization = generateController('getAuthorization', appService.getAuthorization);
