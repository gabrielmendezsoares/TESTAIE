import { IncomingMessage, Server, ServerResponse } from 'http';
import { ApiError, BaseError } from './errors';
import { appRoute } from './routes';
import { IRouteMap } from './routes/interfaces';
import { cryptographyUtil, dateTimeFormatterUtil, HttpClientUtil } from './utils';
import { IConfigurationMap } from './utils/interfaces';
import { ApiKeyStrategy, BasicStrategy, BasicAndBearerTokenStrategy, BearerTokenStrategy, OAuth2Strategy } from './utils/strategies';
import { IAuthenticationStrategy } from './utils/strategies/interfaces';
import { createServer } from './app.module';

/**
 * ## global
 * 
 * Global type declarations for the NodeJS environment.
 * 
 * @description This namespace extends the global NodeJS namespace with additional type definitions
 * for environment variables and custom properties. These declarations ensure type safety
 * and enable IDE autocompletion for custom extensions to built-in JavaScript objects.
 * 
 * The declarations here apply to the entire application and allow TypeScript to properly
 * type-check both built-in and custom functionality on standard objects.
 */
declare global {
  /**
   * ## ObjectConstructor
   * 
   * Type definitions for custom methods added to the Object interface.
   * 
   * @description This interface augmentation extends JavaScript's built-in Object constructor
   * with additional type guard utility methods. These methods enhance type safety
   * when working with values of unknown type that need validation before use.
   * 
   * The methods defined here can be used throughout the application to perform
   * reliable type checking that works correctly with TypeScript's type system.
   */
  interface ObjectConstructor {
    /**
     * ## isObject
     * 
     * Type guard that checks if a value is an object.
     * 
     * @description This method provides a reliable way to determine if a value is an object
     * using proper type checking that works with TypeScript's type system.
     * It considers null as non-object (unlike typeof) and handles arrays
     * according to the includeArrays parameter.
     * 
     * Use this method when you need to verify that a value is an object before
     * performing object-specific operations on it.
     * 
     * @param element - The value to check, typically of unknown type.
     * @param includeArrays - When true, arrays are considered objects; when false (default), arrays are not considered objects.
     * 
     * @returns A boolean indicating whether the value is an object, with type guard functionality.
     */
    isObject(element: unknown, includeArrays?: boolean): element is object;

    /**
     * ## isString
     * 
     * Type guard that checks if a value is a string.
     * 
     * @description This method provides a reliable way to determine if a value is a string
     * using Object.prototype.toString, which correctly identifies string primitives 
     * and String objects. This is more reliable than the typeof operator for
     * certain edge cases.
     * 
     * Use this method when you need to verify that a value is a string before
     * performing string-specific operations on it.
     * 
     * @param element - The value to check, typically of unknown type.
     * 
     * @returns A boolean indicating whether the value is a string, with type guard functionality.
     */
    isString(element: unknown): element is string;
  }
}

Object.isObject = (element: unknown, includeArrays = false): element is object => {
  return element !== null && typeof element === 'object' && (includeArrays || !Array.isArray(element));
};

Object.isString = (element: unknown): element is string => {
  return Object.prototype.toString.call(element) === '[object String]';
};

const PORT = process.env.PORT ?? '3000';
const LOG_INTERVAL = 10_000;
const SHUTDOWN_SIGNALS = ['SIGTERM', 'SIGINT'] as const;

/**
 * ## setupPeriodicLogging
 * 
 * Sets up periodic status logging to indicate server health.
 * 
 * @description This function initializes a recurring interval timer that logs server status information
 * to provide ongoing visibility into server health. It logs the current timestamp and
 * port number at regular intervals defined by {@link LOG_INTERVAL} (in milliseconds).
 * 
 * The timer is configured with unref() to ensure it doesn't prevent the Node.js process
 * from exiting if it's the only remaining event scheduled. This is important for proper
 * server shutdown handling.
 * 
 * @returns A timer reference that can be used with clearInterval if needed.
 */
const setupPeriodicLogging = (): NodeJS.Timeout => {
  return setInterval(
    (): void => {
      console.log(`Server | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Port: ${ PORT }`);
    }, 
    LOG_INTERVAL
  ).unref();
};

/**
 * ## setupGracefulShutdown
 * 
 * Configures graceful shutdown handlers for the server.
 * 
 * @description This function establishes signal handlers for graceful server shutdown, ensuring that
 * in-flight requests can complete before the server exits. It listens for the following signals:
 * 
 * - SIGTERM: Standard termination signal
 * - SIGINT: Interrupt from keyboard (Ctrl+C)
 * 
 * When a shutdown signal is received, the function:
 * 
 * 1. Logs the shutdown initiation
 * 2. Calls server.close() to stop accepting new connections while existing ones complete
 * 3. Sets up a 5-second safety timeout that forces process termination if graceful shutdown hangs
 * 
 * The safety timeout uses unref() to ensure it doesn't prevent the process from exiting
 * naturally when graceful shutdown completes successfully.
 * 
 * @param server - The HTTP/HTTPS server instance to shut down gracefully.
 */
const setupGracefulShutdown = (server: Server<typeof IncomingMessage, typeof ServerResponse>): void => {
  SHUTDOWN_SIGNALS.forEach(
    (signal): void => {
      process.on(
        signal, 
        (): void => {
          console.log(`Server | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Status: ${ signal } received. Shutting down the server`);
          
          server.close(
            (): void => {
              console.log(`Server | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Status: Server closed`);
              process.exit(0);
            }
          );
          
          setTimeout(
            (): void => {
              console.log(`Server | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Status: Forcing server shutdown after timeout`);
              process.exit(1);
            }, 
            5000
          ).unref();
        }
      );
    }
  );
};

/**
 * ## startServer
 * 
 * Initializes and starts the HTTPS server.
 * 
 * @description This function is the main entry point for starting the application server. It performs
 * the following operations:
 * 
 * 1. Starts the server on the port specified by the PORT environment variable (defaults to 3000)
 * 2. Sets up periodic status logging to monitor server health
 * 3. Configures graceful shutdown handlers to ensure clean application termination
 * 4. Establishes error handlers for server-specific errors (e.g., port conflicts)
 * 
 * The function implements comprehensive error handling to ensure that any startup errors
 * are properly logged and the process exits with an appropriate status code. This includes
 * special handling for the EADDRINUSE error, which occurs when the specified port is already in use.
 * 
 * @async
 * 
 * @param serverInstance - The configured HTTPS server instance ready to listen.
 * 
 * @throws If the server fails to start or encounters runtime errors.
 * 
 * @returns A promise that resolves when the server starts successfully.
 */
const startServer = async (serverInstance: Server<typeof IncomingMessage, typeof ServerResponse>): Promise<Server<typeof IncomingMessage, typeof ServerResponse>> => {
  try {
    const server = serverInstance.listen(
      PORT, 
      (): void => {
        console.log(`Server | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Status: Server started`);
        setupPeriodicLogging();
      }
    );
    
    setupGracefulShutdown(server);
    
    server.on(
      'error', 
      (error: NodeJS.ErrnoException): void => {
        if (error.code === 'EADDRINUSE') {
          console.log(`Server | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Error: Port ${ PORT } is already in use`);
        } else {
          console.log(`Server | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Error: ${ error.message }`);
        }

        process.exit(1);
      }
    );

    return server;
  } catch (error: unknown) {
    console.log(`Server | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Error: ${ error instanceof Error ? error.message : String(error) }`);
    process.exit(1);
  }
};

process.on(
  'uncaughtException', 
  (error: unknown): void => {
    console.log(`Server | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Error: ${ error instanceof Error ? error.message : String(error) }`);
    process.exit(1);
  }
);

process.on(
  'unhandledRejection', 
  (error: unknown): void => {
    console.log(`Server | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Error: ${ error instanceof Error ? error.message : String(error) }`);
    process.exit(1);
  }
);

export default startServer;

/**
 * ## generateRoute
 * 
 * Creates and registers a single API route with the Express router.
 * 
 * @description This function provides a standardized way to define and register API routes throughout the application.
 * It encapsulates the complete route registration process, handling version validation, path construction,
 * middleware application, and controller integration.
 * 
 * Key features:
 * 
 * - Version validation: Ensures API versions follow the required format using regex validation
 * - Path construction: Automatically builds URL paths with consistent version prefixing
 * - Middleware integration: Handles authorization and custom middleware sequences
 * - Error handling: Logs validation errors and prevents invalid routes from registering
 * - Controller wrapping: Integrates with application controller for standardized request handling
 * 
 * This unified route generation approach ensures consistency across the API and simplifies
 * the route definition process while enforcing architectural patterns.
 * 
 * Route authorization can be optionally disabled for public endpoints like health checks,
 * authentication endpoints, or public API documentation.
 * 
 * @param routeConfig - The complete route configuration object.
 * @param routeConfig.method - The HTTP method to use (get, post, put, delete, patch, etc.). Must be a valid method name supported by Express Router.
 * @param routeConfig.version - The API version identifier (e.g., 'v1', 'v2'). Must match the pattern 'v' followed by a number (e.g., v1, v2, v10).
 * @param routeConfig.endpoint - The endpoint path excluding the version prefix. Can include route parameters (e.g., 'users/:id/profile') and should not have a leading slash.
 * @param routeConfig.middlewareList - Optional array of middleware functions. These will be executed in the provided order after authorization (if enabled).
 * @param routeConfig.service - The service function containing the business logic. Will be wrapped by the application controller for standardized request/response handling.
 * @param routeConfig.requiresAuthorization - Whether the route requires authorization. When true, the authorization middleware will be applied before any custom middleware. When false, the route will be publicly accessible without authentication.
 * 
 * @throws The function catches and logs validation errors, preventing invalid routes from registering.
 * It does not throw errors to the caller, ensuring application stability even with invalid route definitions.
 * 
 * @returns The function registers the route with Express but does not return a value.
 */
export const generateRoute = appRoute.generateRoute;

export { 
  ApiError,
  BaseError,
  IRouteMap, 
  cryptographyUtil, 
  dateTimeFormatterUtil, 
  HttpClientUtil,
  IConfigurationMap, 
  ApiKeyStrategy, 
  BasicStrategy, 
  BasicAndBearerTokenStrategy, 
  BearerTokenStrategy, 
  OAuth2Strategy,
  IAuthenticationStrategy,
  createServer
};
