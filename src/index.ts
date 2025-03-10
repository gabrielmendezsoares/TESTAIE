import { Server, IncomingMessage, ServerResponse } from 'http';
import appModule from './app.module';
import { dateFormatterUtil } from './utils';

/**
 * @describe Extends the global NodeJS module with custom properties.
 * 
 * @description Adds custom properties to the NodeJS module to provide type guards.
 */
declare global {
  /**
   * @describe Extends the Object interface with custom methods.
   * 
   * @description Adds custom methods to the Object interface to provide type guards.
   */
  interface ObjectConstructor {
    /**
     * @describe Type guard that checks if a value is a non-null object.
     * 
     * @description Determines if the input is a non-null, non-array object unless arrays are explicitly included.
     * 
     * @param element - Value to check.
     * @param includeArrays - When true, arrays are considered objects.
     * 
     * @returns True if the element is an object.
     * 
     * @example
     * if (Object.isObject({ key: 'value' })) {
     *   console.log('Is object');
     * }
     */
    isObject(element: unknown, includeArrays?: boolean): element is object;

    /**
     * @describe Type guard that checks if a value is a string.
     * 
     * @description Determines if the input is a string primitive using reliable type checking.
     * 
     * @param element - Value to check.
     * 
     * @returns True if the element is a string.
     * 
     * @example
     * if (Object.isString('value')) {
     *   console.log('Is string');
     * }
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
 * @describe Logs server events with standardized formatting.
 * 
 * @description Creates a standardized log message including port, timestamp and the message.
 * 
 * @param message - Log message text.
 */
const logServerEvent = (message: string): void => console.log(`Server | Timestamp: ${ dateFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | ${ message }`);

/**
 * @describe Sets up periodic status logging to indicate server health.
 * 
 * @description Initializes an interval timer that logs server port periodically
 * and ensures it doesn't prevent process exit.
 * 
 * @returns Timer reference that can be cleared if needed.
 */
const setupPeriodicLogging = (): NodeJS.Timeout => {
  const logTimer = setInterval((): void => logServerEvent(`Port: ${ PORT }`), LOG_INTERVAL);

  logTimer.unref();

  return logTimer;
};

/**
 * @describe Configures graceful shutdown handlers for the server.
 * 
 * @description Sets up signal handlers for graceful shutdown with a timeout fallback
 * to force termination if graceful shutdown takes too long.
 * 
 * @param server - HTTPS server instance to shut down.
 */
const setupGracefulShutdown = (server: Server<typeof IncomingMessage, typeof ServerResponse>): void => {
  SHUTDOWN_SIGNALS.forEach(
    (signal): void => {
      process.on(
        signal, 
        (): void => {
          logServerEvent(`Status: ${ signal } received. Shutting down the server`);
          
          server.close(
            (): void => {
              logServerEvent('Status: Server closed');
              process.exit(0);
            }
          );
          
          setTimeout(
            (): void => {
              logServerEvent('Status: Forcing server shutdown after timeout');
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
 * @async
 * 
 * @describe Initializes and starts the HTTPS server.
 * 
 * @description Starts the server on the configured port, sets up periodic logging,
 * graceful shutdown handlers, and error handling.
 * 
 * @throws Will exit process on critical errors.
 */
const startServer = async (): Promise<void> => {
  try {
    const resolvedAppModule = await appModule();
    
    const server = resolvedAppModule.listen(
      PORT, 
      (): void => {
        logServerEvent('Status: Server started');
        setupPeriodicLogging();
      }
    );
    
    setupGracefulShutdown(server);
    
    server.on(
      'error', 
      (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE') {
          logServerEvent(`Error: Port ${ PORT } is already in use`);
        } else {
          logServerEvent(`Error: ${ error.message }`);
        }

        process.exit(1);
      }
    );
  } catch (error: unknown) {
    logServerEvent(`Error: ${ error instanceof Error ? error.message : String(error) }`);
    process.exit(1);
  }
};

process.on(
  'uncaughtException', 
  (error: unknown): void => {
    logServerEvent(`Error: ${ error instanceof Error ? error.message : String(error) }`);
    process.exit(1);
  }
);

process.on(
  'unhandledRejection', 
  (error: unknown): void => {
    logServerEvent(`Error: ${ error instanceof Error ? error.message : String(error) }`);
    process.exit(1);
  }
);

startServer().catch(
  (error: unknown): void => {
    logServerEvent(`Error: ${ error instanceof Error ? error.message : String(error) }`);
    process.exit(1);
  }
);
