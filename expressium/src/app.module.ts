import cors from 'cors';
import 'dotenv/config';
import express, { Application, Express, NextFunction, Request, Response } from 'express';
import { rateLimit, RateLimitRequestHandler } from 'express-rate-limit';
import fs from 'fs/promises';
import helmet from 'helmet';
import https, { Server } from 'https';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { appRoute } from './routes';
import { dateTimeFormatterUtil } from './utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const LOGS_DIRECTORY = path.join(__dirname, '../logs');
const SSL_DIRECTORY = path.resolve(__dirname, '../ssl');
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 100;

/**
 * ## getAccessLog
 * 
 * Creates an access log file in a dedicated logs directory.
 *
 * @description This function ensures the logs directory exists and opens a file handle for logging HTTP requests.
 * It creates the directory structure if it doesn't exist using recursive creation.
 * The log file is opened in append mode ('a'), ensuring new logs are added to the end of the file
 * without overwriting existing content.
 * 
 * @async
 * 
 * @returns File handle for the access log file.
 * 
 * @throws If directory creation fails due to permission issues or other filesystem errors.
 * @throws If file opening fails due to permission issues or other filesystem errors.
 */
const getAccessLog = async (): Promise<fs.FileHandle> => {
  await fs.mkdir(LOGS_DIRECTORY, { recursive: true });

  return await fs.open(path.join(LOGS_DIRECTORY, 'access.log'), 'a');
};

/**
 * ## getRateLimiter
 * 
 * Creates a rate limiter middleware for the Express application.
 *
 * @description This function configures rate limiting middleware to prevent excessive requests from a single IP address.
 * The limiter enforces the following constraints:
 * 
 * - Allows {@link RATE_LIMIT_MAX_REQUESTS} requests per IP address within a time window
 * - Time window is defined by {@link RATE_LIMIT_WINDOW_MS} in milliseconds (default: 15 minutes)
 * - Uses the client's IP address as the rate limiting key
 * - Implements draft-8 standard headers for rate limit information
 * - Provides a custom response handler for rate-limited requests
 * 
 * When a client exceeds the rate limit, the handler returns a detailed JSON response with:
 * 
 * - HTTP status code 429 (Too Many Requests)
 * - Current timestamp
 * - Reset time (when the rate limit window expires)
 * - Informative message and suggestion
 * 
 * @returns Configured Express middleware that can be used with app.use().
 */
const getRateLimiter = (): RateLimitRequestHandler => {
  return rateLimit(
    {
      windowMs: RATE_LIMIT_WINDOW_MS,
      limit: RATE_LIMIT_MAX_REQUESTS,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      keyGenerator: (req: Request): string => req.ip as string,
      handler: (
        req: Request,
        res: Response
      ): void => {
        res
          .status(429)
          .json(
            {
              status: false,
              statusCode: 429,
              timestamp: dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()),
              path: req.originalUrl || req.url,
              method: req.method,
              message: 'Too many requests from this IP.',
              suggestion: 'Please wait before trying again.',
              resetTime: dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(req.rateLimit.resetTime as Date)
            }
          );
      }
    }
  );
};

/**
 * ## configureApp
 * 
 * Configures an Express application with security middleware and routes.
 *
 * @description This function initializes an Express application with a comprehensive set of middleware and configurations:
 * 
 * Security Features:
 * 
 * - Trust proxy settings to ensure correct client IP detection behind reverse proxies
 * - Rate limiting to prevent abuse (configured via {@link getRateLimiter})
 * - CORS support to handle cross-origin requests securely
 * - Security headers via Helmet middleware to protect against common web vulnerabilities
 * 
 * Request Processing:
 * 
 * - JSON body parsing for API requests
 * - Request logging in two formats:
 * 
 * 1. Development-friendly console output ('dev' format)
 * 2. Detailed logs to access.log file ('combined' format)
 * 
 * Routing:
 * 
 * - All API routes mounted under the '/api' path prefix
 * 
 * @async
 * 
 * @param app - The Express application instance to configure.
 * 
 * @returns Configured Express application.
 * 
 * @throws If access log creation fails.
 */
const configureApp = async (app: Express): Promise<Application> => {
  const accessLog = await getAccessLog();
  
  app.set('trust proxy', 1);
  app.use(getRateLimiter());
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(morgan('combined', { stream: accessLog.createWriteStream() }));
  app.use('/api', appRoute.router);

  app.use(
    (
      req: Request, 
      res: Response, 
      _next: NextFunction
    ): void => {
      res
        .status(404)
        .json(
          {
            status: false,
            statusCode: 404,
            timestamp: dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()),
            path: req.originalUrl || req.url,
            method: req.method,
            message: 'Route not found.',
            suggestion: 'Please check the URL and HTTP method to ensure they are correct.'
          }
        );
    }
  );
  
  return app;
};

/**
 * ## loadSSLCertificates
 * 
 * Loads SSL certificates from the filesystem for HTTPS server creation.
 *
 * @description This function reads the SSL certificate and private key files from the predefined SSL directory.
 * It uses Promise.all to read both files concurrently for improved performance.
 * 
 * Expected files in the SSL directory:
 * 
 * - cert.pem: The SSL certificate file
 * - key.pem: The private key file
 * 
 * Both files must be in PEM format (Base64 encoded DER certificate enclosed between 
 * "-----BEGIN CERTIFICATE-----" and "-----END CERTIFICATE-----").
 * 
 * @async
 * 
 * @returns Object containing the certificate and private key as strings.
 * 
 * @throws If the SSL directory doesn't exist or lacks proper permissions.
 * @throws If either certificate file is missing or unreadable.
 * @throws If the certificate files are not valid PEM format.
 */
const loadSSLCertificates = async (): Promise<{ cert: string, key: string }> => {
  const [cert, key] = await Promise.all(
    [
      fs.readFile(path.join(SSL_DIRECTORY, 'cert.pem'), 'utf8'),
      fs.readFile(path.join(SSL_DIRECTORY, 'key.pem'), 'utf8')
    ]
  );
    
  return { cert, key };
};

/**
 * ## createServer
 * 
 * Creates a secure HTTPS server with the configured Express application.
 *
 * @description This function performs a complete server setup process:
 * 
 * 1. Configures the Express application with security middleware and routes using the {@link configureApp} function.
 * 2. Loads SSL certificates from the filesystem using the {@link loadSSLCertificates} function.
 * 3. Creates an HTTPS server with the configured application and certificates.
 * 
 * Both configuration steps run concurrently using Promise.all for optimal performance.
 * 
 * The resulting server is ready to listen on a port but is not yet started.
 * You need to call startServer() after receiving the server instance.
 * 
 * @async
 * 
 * @param app - The Express application instance to use.
 * 
 * @returns A configured HTTPS server instance.
 * 
 * @throws If application configuration fails.
 * @throws If SSL certificate loading fails.
 * @throws If server creation fails.
 */
export const createServer = async (app: Express): Promise<Server> => {
  const [configuredApp, { cert, key }] = await Promise.all(
    [
      configureApp(app),
      loadSSLCertificates()
    ]
  );

  return https.createServer({ cert, key }, configuredApp);
};
