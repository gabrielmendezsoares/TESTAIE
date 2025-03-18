/**
 * ## ICustomError
 * 
 * Core interface for the application's standardized error handling system.
 * 
 * @description This interface defines the mandatory contract for all custom error objects throughout
 * the application, ensuring consistent error structure, serialization, and handling across all layers.
 * It extends beyond standard JavaScript Error capabilities to include application-specific metadata
 * needed for proper error processing, logging, and client communication.
 * 
 * The interface provides:
 * 
 * - Human-readable error information (message, name)
 * - Machine-processable error classification (code)
 * - HTTP integration capabilities (status)
 * - Debugging support (stack trace)
 * 
 * By standardizing error structures, this interface enables:
 * - Consistent error handling middleware
 * - Automated error logging with proper context
 * - Uniform client-facing error responses
 * - Error aggregation and analysis capabilities
 * 
 * All custom error classes in the application should implement this interface
 * to ensure consistent error processing throughout the system.
 */
export interface ICustomError {
  message: string;
  code: string;
  status: number;
  name: string;
  stack?: string;
}
