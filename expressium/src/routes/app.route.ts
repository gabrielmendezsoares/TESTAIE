import { Router } from 'express';
import path from 'path';
import { appController } from '../controllers';
import { IRoute } from './interfaces';
import { appMiddleware } from '../middlewares';
import { appService } from '../services';

export const router = Router();

/**
 * ## generateRoute
 * 
 * Creates and registers a single API route.
 * 
 * @description This function registers a route with the Express router:
 *  - Adds an optional authorization middleware based on configuration
 *  - Applies the appropriate HTTP method handler
 *  - Constructs the full route path with version prefix
 *  - Attaches the service function wrapped in a controller
 * 
 * @param routeConfig - The route configuration object.
 * @param routeConfig.version - The API version identifier (e.g., 'v1', 'v2').
 * @param routeConfig.endpoint - The endpoint path (excluding version prefix).
 * @param routeConfig.method - The HTTP method (get, post, put, delete, etc.).
 * @param routeConfig.service - The service function to handle the route.
 * @param routeConfig.requiresAuthorization - Whether the route requires authorization (defaults to true).
 */
export const generateRoute = (
  { 
    version,
    endpoint, 
    method, 
    service, 
    requiresAuthorization = true
  }: IRoute.IRoute
): void => {
  if (requiresAuthorization) {
    (router as any)[method](`/${ version }/${ endpoint }`, appMiddleware.getAuthorization, appController.generateController(service));
  } else {
    (router as any)[method](`/${ version }/${ endpoint }`, appController.generateController(service));
  }
};

generateRoute(
  {
    version: 'v1',
    endpoint: `${ path.basename(process.cwd()) }/main/get/authentication`,
    method: 'post',
    service: appService.getAuthentication,
    requiresAuthorization: false
  } as IRoute.IRoute
);
