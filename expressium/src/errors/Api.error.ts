import { ICustomError } from "./interfaces";
import { BaseError } from './Base.error';

/**
 * ## ApiError
 * 
 * API-specific error implementation for handling HTTP request failures.
 * 
 * @description ApiError represents errors that occur during API operations. It provides
 * standardized error reporting with HTTP status codes, error messages, and
 * error codes to help with debugging and client response handling.
 */
export class ApiError extends BaseError implements ICustomError.ICustomError {
  /**
   * ## constructor
   * 
   * Creates a new ApiError instance.
   * 
   * @description Initializes a new API error with the specified message, code, and HTTP status.
   * The error is automatically configured with standard properties inherited from
   * BaseError while adding API-specific error handling.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param message - Human-readable description of the error.
   * @param code - Machine-readable error code for programmatic handling.
   * @param status - HTTP status code to return to the client.
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
