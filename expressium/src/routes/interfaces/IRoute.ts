/**
 * ## IRoute
 * 
 * Standard structure for route objects.
 * 
 * @description Defines the contract that all route objects must follow when dealing with
 * route configuration. This interface specifies the version, endpoint, method, service, and
 * authorization requirements for a given route.
 */
export interface IRoute {
  version: string,
  endpoint: string,
  method: string,
  service: Function,
  requiresAuthorization?: boolean
};
