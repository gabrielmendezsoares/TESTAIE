/**
 * ## IRouteMap
 * 
 * Standard structure for route objects.
 * 
 * @description This interface defines the required properties for a route configuration object.
 * It is used to enforce consistent route definitions and ensure that all routes follow the same structure.
 * 
 * The interface includes properties for the HTTP method, API version, endpoint path, middleware list,
 * service function, and authorization requirement. These properties are used to generate and register
 * API routes with the Express router.  
 */
export interface IRouteMap {
  method: string,
  version: string,
  endpoint: string,
  serviceHandler: Function,
  requiresAuthorization?: boolean
  roleList?: string[],
  middlewareHandlerList?: Function[],
};
