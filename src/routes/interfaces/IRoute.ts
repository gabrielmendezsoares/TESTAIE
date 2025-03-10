import { RequestHandler } from 'express';

/**
 * @interface IRoute
 * 
 * @describe Interface for route objects.
 * 
 * @description Defines the contract that all route objects must follow.
 */
export interface IRoute {
  endpoint: string,
  method: string,
  controller: RequestHandler,
  requiresAuthorization?: boolean
};
