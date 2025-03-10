/**
 * @interface ICustomError
 * 
 * @describe Interface for custom error objects.
 * 
 * @description Defines the contract that all custom error objects must follow.
 */
export interface ICustomError {
  message: string;
  code: string;
  status: number;
  name: string;
  stack?: string;
}
