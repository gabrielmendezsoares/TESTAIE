/**
 * ## ICustomError
 * 
 * Standard error structure for application-wide error handling.
 * 
 * @description Defines the contract that all custom error objects must follow throughout the application.
 * This interface ensures consistent error handling by standardizing error properties
 * across different error types.
 */
export interface ICustomError {
  message: string;
  code: string;
  status: number;
  name: string;
  stack?: string;
}
