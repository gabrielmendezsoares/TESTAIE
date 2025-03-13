import { ICustomError } from "./interfaces";

/**
 * ## BaseError
 * 
 * Foundation error class for the application's error handling system.
 * 
 * @description BaseError serves as the foundation for all custom errors in the application.
 * It extends the native Error class while adding support for error codes and
 * HTTP status codes to provide more context about errors. This class should
 * typically be extended by more specific error types rather than used directly.
 */
export class BaseError extends Error implements ICustomError.ICustomError {   
  /**
   * ## constructor
   * 
   * Creates a new BaseError instance.
   * 
   * @description Initializes a new error with enhanced properties beyond the standard Error object.
   * Sets the name to the constructor name for better error identification and
   * captures the stack trace for debugging purposes.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param message - Human-readable description of what went wrong.
   * @param code - Application-specific error code for programmatic error handling.
   * @param status - HTTP status code to be used when this error reaches an API boundary.
   */
  public constructor(
    /**
     * @public
     */
    public message: string,

    /**
     * @public
     */
    public code: string,

    /**
     * @public
     */
    public status: number
  ) {
    super(message);

    this.name = this.constructor.name;
    
    Error.captureStackTrace(this, this.constructor);
  }
}
