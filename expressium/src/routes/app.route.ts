import { Request, Response, Router, NextFunction } from 'express';
import path from 'path';
import { appController } from '../controllers';
import { IResponse, IResponseData } from '../interfaces';
import { IRouteMap } from './interfaces';
import { appMiddleware } from '../middlewares';
import { appService } from '../services';
import { dateTimeFormatterUtil } from '../utils';

export const router = Router();

const versionRegex = /^v[0-9]+$/;

/**
 * ## generateRoute
 * 
 * Creates and registers a single API route with the Express router.
 * 
 * @description This function provides a standardized way to define and register API routes throughout the application.
 * It encapsulates the complete route registration process, handling version validation, path construction,
 * middleware application, role-based authorization, and controller integration.
 * 
 * ### Key features:
 * 
 * - Version validation: Ensures API versions follow the required format (v + number) using regex validation
 * - Path construction: Automatically builds URL paths with consistent version prefixing
 * - Middleware integration: Handles authorization and custom middleware sequences in correct order
 * - Role-based access control: Supports limiting route access based on user roles
 * - Error handling: Logs validation errors and prevents invalid routes from registering
 * - Controller wrapping: Integrates with application controller for standardized request handling
 * - Consistent route structure: Enforces application-wide API URL pattern consistency
 * 
 * ### Route registration process:
 * 
 * 1. Validate the API version format against the regex pattern
 * 2. Log and abort if version format is invalid
 * 3. Build the complete route path with version prefix
 * 4. Apply authorization middleware if required (with optional role checking)
 * 5. Apply any custom middleware handlers in the specified order
 * 6. Wrap the service function with the application controller
 * 7. Register the complete route with the Express router using the specified HTTP method
 * 
 * ### URL path structure:
 * 
 * The final route path follows the pattern: `/<version>/<endpoint>`
 * Example: `/v1/users/profile` for version 'v1' and endpoint 'users/profile'
 * 
 * This unified route generation approach ensures consistency across the API and simplifies
 * the route definition process while enforcing architectural patterns.
 * 
 * Route authorization can be optionally disabled for public endpoints like health checks,
 * authentication endpoints, or public API documentation.
 * 
 * @param routeConfig - The complete route configuration object.
 * 
 * @param routeConfig.method - The HTTP method to use (get, post, put, delete, patch, etc.).
 * Must be a valid method name supported by Express Router.
 * 
 * @param routeConfig.version - The API version identifier (e.g., 'v1', 'v2').
 * Must match the pattern 'v' followed by a number (e.g., v1, v2, v10).
 * 
 * @param routeConfig.endpoint - The endpoint path excluding the version prefix.
 * Can include route parameters (e.g., 'users/:id/profile')
 * and should not have a leading slash.
 * 
 * @param routeConfig.serviceHandler - The service function containing the business logic.
 * Will be wrapped by the application controller for
 * standardized request/response handling.
 * 
 * @param routeConfig.requiresAuthorization - Whether the route requires authorization (defaults to true).
 * When true, the authorization middleware will be applied
 * before any custom middleware.
 * When false, the route will be publicly accessible.
 * 
 * @param routeConfig.roleList - Optional array of user role strings required to access this route.
 * If provided, only users with at least one matching role will be allowed.
 * 
 * @param routeConfig.middlewareHandlerList - Optional array of middleware functions.
 * These will be executed in the provided order
 * after authorization (if enabled).
 * 
 * @throws The function catches and logs validation errors, preventing invalid routes from registering.
 * It does not throw errors to the caller, ensuring application stability even with invalid route definitions.
 * 
 * @returns The function registers the route with Express but does not return a value.
 */
export const generateRoute = (
  { 
    method, 
    version,
    endpoint,
    serviceHandler, 
    requiresAuthorization = true,
    roleList,
    middlewareHandlerList = [], 
  }: IRouteMap.IRouteMap
): void => {
  if (!versionRegex.test(version)) {
    console.log(`Server | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Error: Invalid API version - ${ version }`);

    return;
  }

  if (requiresAuthorization) {
    const getAuthorization = (req: Request, res: Response, next: NextFunction): Promise<IResponse.IResponse<IResponseData.IResponseData> | void> => {
      return appMiddleware.getAuthorization(req, res, next, roleList);
    };

    (router as any)[method](`/${ version }/${ endpoint }`, getAuthorization, ...middlewareHandlerList, appController.generateController(serviceHandler));
  } else {
    (router as any)[method](`/${ version }/${ endpoint }`, ...middlewareHandlerList, appController.generateController(serviceHandler));
  }
};

generateRoute(
  {
    version: 'v1',
    method: 'get',
    endpoint: `${ path.basename(process.cwd()) }/main/get/authentication`,
    serviceHandler: appService.getAuthentication,
    requiresAuthorization: false
  } as IRouteMap.IRouteMap
);
