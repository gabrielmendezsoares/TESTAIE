/**
 * ## ICustomError
 * 
 * Interface for custom error objects.
 * 
 * @description Defines the contract that all custom error objects must follow.
 */
export interface ICustomError {
  status: number;
  code: string;
  name: string;
  message: string;
  stack?: string;
}
