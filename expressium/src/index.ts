import { IncomingMessage, Server, ServerResponse } from 'http';
import { ApiError, BaseError } from './errors';
import { appRoute } from './routes';
import { IRoute } from './routes/interfaces';
import { cryptographyUtil, dateTimeFormatterUtil, HttpClientUtil } from './utils';
import { IHttpClientConfiguration } from './utils/interfaces';
import { ApiKeyStrategy, BasicStrategy, BasicAndBearerTokenStrategy, BearerTokenStrategy, OAuth2Strategy } from './utils/strategies';
import { IAuthenticationStrategy } from './utils/strategies/interfaces';
import appModule, { createServer } from './app.module';

/**
 * ## global
 * 
 * Global type declarations for the NodeJS environment.
 * 
 * @description Extends the global NodeJS namespace with additional type definitions
 * for environment variables and other custom properties. This helps provide
 * type safety and autocompletion when accessing process.env values.
 */
declare global {
  /**
   * ## ObjectConstructor
   * 
   * Type definitions for custom methods added to the Object interface.
   * 
   * @description Defines additional methods that are added to the Object interface
   * to provide type guards and other utility functions for object manipulation.
   */
  interface ObjectConstructor {
    /**
     * ## isObject
     * 
     * Type guard that checks if a value is an object.
     * 
     * @description Determines if the input is an object using reliable type checking.
     * 
     * @param element - Value to check.
     * @param includeArrays - When true, arrays are considered objects.
     * 
     * @returns True if the element is an object.
     */
    isObject(element: unknown, includeArrays?: boolean): element is object;

    /**
     * ## isString
     * 
     * Type guard that checks if a value is a string.
     * 
     * @description Determines if the input is a string using reliable type checking.
     * 
     * @param element - Value to check.
     * 
     * @returns True if the element is a string.
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
 * @description Initializes an interval timer that logs server port every {@link LOG_INTERVAL} milliseconds
 * and ensures it doesn't prevent process exit by using unref().
 * 
 * @returns Timer reference that can be cleared if needed.
 */
const setupPeriodicLogging = (): NodeJS.Timeout => {
  const logTimer = setInterval((): void => console.log(`Server | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Port: ${ PORT }`), LOG_INTERVAL);

  logTimer.unref();

  return logTimer;
};

/**
 * ## setupGracefulShutdown
 * 
 * Configures graceful shutdown handlers for the server.
 * 
 * @description Sets up signal handlers for graceful shutdown with a 5-second timeout fallback
 * to force termination if graceful shutdown takes too long. Handles {@link SHUTDOWN_SIGNALS}.
 * 
 * @param server - HTTPS server instance to shut down.
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
 * @description Starts the server on the configured port, sets up periodic logging,
 * graceful shutdown handlers, and error handling. Listens for server errors
 * and handles them appropriately.
 * 
 * @async
 * 
 * @param resolvedAppModule - The resolved Express application module.
 * 
 * @throws Will exit process on critical errors.
 */
export const startServer = async (resolvedAppModule: Server): Promise<void> => {
  try {
    const server = resolvedAppModule.listen(
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

export default appModule;

/**
 * ## generateRoute
 * 
 * Creates and registers a single API route.
 * 
 * @description This function registers a route with the Express router:
 *  - Adds an optional authorization middleware based on configuration
 *  - Applies the appropriate HTTP method handler
 *  - Constructs the full route path with version prefix
 *  - Attaches the service function wrapped in a controller
 * 
 * @param routeConfig - The route configuration object.
 * @param routeConfig.version - The API version identifier (e.g., 'v1', 'v2').
 * @param routeConfig.endpoint - The endpoint path (excluding version prefix).
 * @param routeConfig.method - The HTTP method (get, post, put, delete, etc.).
 * @param routeConfig.service - The service function to handle the route.
 * @param routeConfig.requiresAuthorization - Whether the route requires authorization (defaults to true).
 */
export const generateRoute = appRoute.generateRoute;

export { 
  ApiError,
  BaseError,
  IRoute, 
  cryptographyUtil, 
  dateTimeFormatterUtil, 
  HttpClientUtil,
  IHttpClientConfiguration, 
  ApiKeyStrategy, 
  BasicStrategy, 
  BasicAndBearerTokenStrategy, 
  BearerTokenStrategy, 
  OAuth2Strategy,
  IAuthenticationStrategy,
  createServer
};
