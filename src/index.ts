import express from 'express';

import 
    startServer, 
    { 
      ApiError,
      BaseError,
      generateRoute,
      router,
      IRouteMap, 
      cryptographyUtil, 
      dateTimeFormatterUtil, 
      HttpClientUtil,
      IConfigurationMap, 
      ApiKeyStrategy, 
      BasicStrategy, 
      BasicAndTokenStrategy, 
      OAuth2Strategy,
      TokenStrategy,
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
      
      await startServer(serverInstance);
    } catch (error: unknown) {
      console.log(`Server | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Error: ${ error instanceof Error ? error.message : String(error) }`);
      process.exit(1);
    }
  }
)();
