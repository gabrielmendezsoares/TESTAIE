import 'dotenv/config';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { rateLimit, RateLimitRequestHandler } from 'express-rate-limit';
import fs from 'fs/promises';
import helmet from 'helmet';
import https, { Server } from 'https';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { appRoute } from './routes';
import { dateFormatterUtil } from './utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const LOGS_DIRECTORY = path.join(__dirname, '../logs');
const SSL_DIRECTORY = path.resolve(__dirname, '../ssl');
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 100;

/**
 * @async
 * 
 * @describe Creates an access log file in a dedicated logs directory.
 * 
 * @description Ensures the logs directory exists and opens a file handle for logging.
 * 
 * @returns File handle for the access log file.
 * 
 * @throws If directory creation or file opening fails.
 */
const getAccessLog = async (): Promise<fs.FileHandle> => {
  await fs.mkdir(LOGS_DIRECTORY, { recursive: true });

  return await fs.open(path.join(LOGS_DIRECTORY, 'access.log'), 'a');
};

/**
 * @describe Creates a rate limiter middleware for the Express application.
 * 
 * @description Configures rate limiting to prevent excessive requests from a single IP.
 * 
 * @returns Configured rate limiter middleware.
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
              timestamp: dateFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()),
              resetTime: dateFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(req.rateLimit.resetTime as Date),
              message: 'Too many requests from this IP.',
              suggestion: 'Please wait before trying again.'
            }
          );
      }
    }
  );
};

/**
 * @async
 * 
 * @describe Configures an Express application with middlewares and routes.
 * 
 * @description Initializes an Express app, configures middlewares and routes.
 * 
 * @returns Configured Express application.
 */
const configureApp = async (): Promise<Application> => {
  const app = express();
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
      res: Response
    ): void => {
      res
        .status(404)
        .json(
          { 
            status: false,
            statusCode: 404,
            timestamp: dateFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()),
            path: req.originalUrl || req.url,
            method: req.method,
            message: 'Invalid endpoint or method.',
            suggestion: 'Please check API documentation for available endpoints and methods.'
          }
        );
    }
  );
  
  return app;
};

/**
 * @async
 * 
 * @describe Loads SSL certificates from the SSL directory.
 * 
 * @description Reads the SSL certificates from the SSL directory.
 * 
 * @returns Object containing certificate and key strings.
 * 
 * @throws If certificate reading fails.
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
 * @async
 * 
 * @describe Creates a secure HTTPS server with the configured Express application.
 * 
 * @description Initializes an Express app, configures middlewares and routes,
 * and creates an HTTPS server using SSL certificates.
 * 
 * @returns Configured HTTPS server instance.
 * 
 * @throws If server creation fails.
 */
const createServer = async (): Promise<Server> => {
  const [app, { cert, key }] = await Promise.all(
    [
      configureApp(),
      loadSSLCertificates()
    ]
  );

  return https.createServer({ cert, key }, app);
};

export default createServer;
