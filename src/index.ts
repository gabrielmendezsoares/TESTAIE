import express from 'express';

import 
    startServer, 
    { 
      ApiError,
      BaseError,
      generateRoute,
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
    } 
from '../expressium/src';

import { appRoute } from './routes';

(
  async (): Promise<void> => {
    try {
      appRoute.generateRoutes();

      const app = express();
      const serverInstance = await createServer(app);
      
      startServer(serverInstance);
    } catch (error: unknown) {
      console.log(`Server | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Error: ${ error instanceof Error ? error.message : String(error) }`);
      process.exit(1);
    }
  }
)();
