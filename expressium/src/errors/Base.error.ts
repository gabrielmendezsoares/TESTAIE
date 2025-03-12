import { ICustomError } from "./interfaces";

/**
 * ## BaseError
 * 
 * Base class for all custom errors.
 * 
 * @description This class extends the native Error class and implements the ICustomError interface.
 */
export class BaseError extends Error implements ICustomError.ICustomError {   
  /**
   * ## constructor
   * 
   * Creates an BaseError instance.
   * 
   * @description Initializes a new base error with message, code and status. Sets the name to the constructor name and captures the stack trace.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param message - Error message.
   * @param code - Error code.
   * @param status - HTTP status code.
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
