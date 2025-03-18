import { ICustomError } from "./interfaces";
import { BaseError } from './Base.error';

/**
 * ## ApiError
 * 
 * Specialized error class for API-specific error handling and HTTP response generation.
 * 
 * @description ApiError represents errors that occur during API operations, providing
 * a standardized way to generate and handle errors that need to be communicated to API clients.
 * It extends BaseError and specializes in HTTP-related error scenarios with appropriate
 * status codes and formatted error messages.
 * 
 * Key features:
 * 
 * - Provides defaults optimized for API error handling
 * - Integrates with HTTP status codes for proper response generation
 * - Supports standard error codes for client-side error handling
 * - Maintains detailed error messages suitable for API responses
 * - Preserves stack traces for server-side debugging
 * 
 * This class should be used for all errors that might reach API boundaries, ensuring
 * consistent error response formatting. It can be further extended for specific API
 * error scenarios (e.g., ValidationError, AuthenticationError) to provide more granular
 * error handling.
 */
export class ApiError extends BaseError implements ICustomError.ICustomError {
  /**
   * ## constructor
   * 
   * Creates a new ApiError instance with HTTP-specific error properties.
   * 
   * @description Initializes a new API error with the specified message, code, and HTTP status.
   * This constructor provides sensible defaults for API errors while allowing full customization:
   * 
   * - Default error code: 'API_ERROR' (can be overridden for specific error types)
   * - Default HTTP status: 500 (Internal Server Error) for unspecified errors
   * 
   * The constructor delegates to the BaseError constructor to handle common error properties
   * while adding API-specific error context. This approach ensures consistent error handling
   * across the application while specializing for API scenarios.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param message - Detailed human-readable description of the error.
   * Should be clear, concise, and potentially suitable for end-user display
   * in API responses.
   * 
   * @param code - Machine-readable error code for programmatic handling.
   * Should follow API error code conventions for the application.
   * Defaults to 'API_ERROR' if not specified.
   * 
   * @param status - HTTP status code to return to the client.
   * Should follow standard HTTP status code conventions.
   * Defaults to 500 (Internal Server Error) if not specified.
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
