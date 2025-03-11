import { ICustomError } from "./interfaces";
import { BaseError } from './Base.error';

/**
 * ## ApiError
 * 
 * Base class for API errors.
 * 
 * @description This class extends the BaseError class and implements the ICustomError interface.
 */
export class ApiError extends BaseError implements ICustomError.ICustomError {
  /**
   * ## constructor
   * 
   * Constructor for the ApiError class.
   * 
   * @description Creates an instance of ApiError.
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
   * // Example of creating an instance of ApiError.
   * 
   * const error = new ApiError('An error occurred.', 'ERROR_CODE', 500);
   */
  public constructor(
    /**
     * @public
     */
    public message: string,

    /**
     * @public
     */
    public code: string = 'API_ERROR',

    /**
     * @public
     */
    public status: number = 500
  ) {
    super(
      message, 
      code,
      status
    );
  }
}
