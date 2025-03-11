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
   * Constructor for the BaseError class.
   * 
   * @description Creates an instance of BaseError.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param message - Error message.
   * @param code - Error code.
   * @param status - HTTP status code.
   * 
   * @example
   * // Example of creating an instance of BaseError.
   * 
   * const error = new BaseError('An error occurred.', 'ERROR_CODE', 500);
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
