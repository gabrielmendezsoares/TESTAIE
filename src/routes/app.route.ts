import { Request, Response, Router } from 'express';
import { appController } from '../controllers';
import { IRoute } from './interfaces';
import { dateFormatterUtil } from '../utils';

export const router = Router();

const routes = [
  {
    version: 'v1',
    routes: [
      {
        endpoint: 'auth/guard/main/get/authentication',
        method: 'get',
        controller: appController.getAuthentication,
        requiresAuthorization: false
      },
      {
        endpoint: 'auth/guard/main/get/authorization',
        method: 'get',
        controller: appController.getAuthorization,
        requiresAuthorization: false
      }
    ]
  }
];

/**
 * @describe Creates and registers versioned API routes.
 * 
 * @description This function registers routes with an optional authorization middleware, 
 * based on the route configuration.
 * Each route is registered under the specified version's URL prefix.
 * 
 * @param version - The version identifier (e.g., 'v1', 'v2').
 * @param routes - The route configurations to be registered for the given version.
 */
const createVersionedRoutes = (version: string, routes: IRoute.IRoute[]): void => {
  routes.forEach(
    (
      { 
        endpoint, 
        method, 
        controller, 
        requiresAuthorization = true 
      }: IRoute.IRoute
    ): void => {
      if (requiresAuthorization) {
        (router as any)[method](`/${ version }/${ endpoint }`, appController.getAuthorization, controller);
      } else {
        (router as any)[method](`/${ version }/${ endpoint }`, controller);
      }
    }
  );
};

routes.forEach(
  ({ version, routes }: { version: string, routes: IRoute.IRoute[] }): void => {
    createVersionedRoutes(version, routes);
  }
);

router.use(
  (
    req: Request,
    res: Response
  ): void => {
    res
      .status(404)
      .json(
        { 
          status: false,
          statusCode: 404,
          timestamp: dateFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()),
          path: req.originalUrl || req.url,
          method: req.method,
          message: 'Invalid endpoint or method.',
          suggestion: 'Please check API documentation for available endpoints and methods.'
        }
      );
  }
);
