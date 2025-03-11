/**
 * ## IRoute
 * 
 * Interface for route objects.
 * 
 * @description Defines the contract that all route objects must follow.
 */
export interface IRoute {
  version: string,
  endpoint: string,
  method: string,
  service: Function,
  requiresAuthorization?: boolean
};
