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
   * Creates an ApiError instance.
   * 
   * @description Initializes a new API error with message, code and status.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param message - Error message.
   * @param code - Error code (default: 'API_ERROR').
   * @param status - HTTP status code (default: 500).
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
