/**
 * ## IRouteMap
 * 
 * Standard structure for route objects in the API routing system.
 * 
 * @description This interface defines the required properties for a route configuration object.
 * It is used to enforce consistent route definitions and ensure that all routes follow the same structure
 * throughout the application. Each route object serves as a blueprint for registering routes with the 
 * Express router.
 * 
 * The interface provides a comprehensive definition that includes:
 * - HTTP method specification
 * - API versioning support
 * - URL path definition
 * - Service handler mapping
 * - Authorization controls
 * - Role-based access capabilities
 * - Middleware integration
 * 
 * These properties work together to create a complete route definition that can be automatically
 * processed by the router registration system to generate fully functional API endpoints.
 */
export interface IRouteMap {
  method: string,
  version: string,
  url: string,
  serviceHandler: Function,
  requiresAuthorization?: boolean
  roleList?: string[],
  middlewareHandlerList?: Function[],
};
