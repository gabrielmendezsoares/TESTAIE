import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { generateRoute, router, dateTimeFormatterUtil } from '../../expressium/src';
import { appService } from "../services";

export const generateRoutes = (): void => {
  try {
    generateRoute(
      {
        version: 'v1',
        endpoint: `${ path.basename(process.cwd()) }/main/get/template`,
        method: 'get',
        serviceHandler: appService.getTemplate,
        requiresAuthorization: false
      }
    );

    router.use(
      (
        req: Request, 
        res: Response, 
        _next: NextFunction
      ) => {
        res
          .status(404)
          .json(
            {
              status: false,
              statusCode: 404,
              timestamp: dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()),
              path: req.originalUrl || req.url,
              method: req.method,
              message: 'Route not found.',
              suggestion: 'Please check the URL and HTTP method to ensure they are correct.'
            }
          );
      }
    );
  } catch (error: unknown) {
    console.log(`Route | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Name: generateRoutes | Error: ${ error instanceof Error ? error.message : String(error) }`);
    process.exit(1);
  }
};
