import { ICustomError } from "./interfaces";

/**
 * ## BaseError
 * 
 * Foundation error class for the application's hierarchical error handling system.
 * 
 * @description BaseError serves as the abstract base class for all custom errors in the application,
 * providing a consistent foundation for error handling across all layers. It extends the native
 * JavaScript Error class while implementing the ICustomError interface to ensure a standardized
 * error structure.
 * 
 * Key features:
 * 
 * - Extends native Error for compatibility with standard JavaScript error handling
 * - Implements ICustomError for application-specific error metadata
 * - Captures stack traces automatically for debugging
 * - Configures error name based on the constructor for better error identification
 * - Supports HTTP status codes for API integration
 * - Provides consistent error code support for programmatic error handling
 * 
 * This class serves as the parent for more specific error types rather than being instantiated
 * directly. Specialized error classes should extend BaseError and define their own specific
 * error codes, default status codes, and domain-specific properties.
 */
export class BaseError extends Error implements ICustomError.ICustomError {   
  /**
   * ## constructor
   * 
   * Creates a new BaseError instance with enhanced error properties.
   * 
   * @description Initializes a new error with extended properties beyond the standard Error object.
   * This constructor handles:
   * 
   * - Setting the error message for human readability
   * - Assigning an error code for programmatic handling
   * - Defining an HTTP status code for API responses
   * - Setting the error name to the constructor name for better identification
   * - Capturing the stack trace for debugging purposes
   * 
   * The constructor stores all these properties as public members, making them accessible
   * throughout the error handling chain, from generation to client response.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param message - Detailed human-readable description of what went wrong.
   * Should be clear enough for developers while potentially
   * being suitable for end-user display.
   * 
   * @param code - Application-specific error code for programmatic error handling.
   * Should follow a consistent naming convention (e.g., RESOURCE_NOT_FOUND)
   * to enable systematic error processing.
   * 
   * @param status - HTTP status code to be used when this error reaches an API boundary.
   * Should follow standard HTTP status code conventions (e.g., 404 for
   * not found, 400 for bad request, 500 for server error).
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
