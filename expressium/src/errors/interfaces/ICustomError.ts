/**
 * ## ICustomError
 * 
 * Standard error structure for application-wide error handling.
 * 
 * @description This interface defines the required properties for a custom error object.
 * It is used to enforce consistent error handling and ensure that all errors follow the same structure.
 * 
 * The interface includes properties for the error message, error code, HTTP status code, error name, and stack trace.
 * These properties are used to generate and return error responses to the client.
 */
export interface ICustomError {
  message: string;
  code: string;
  status: number;
  name: string;
  stack?: string;
}
