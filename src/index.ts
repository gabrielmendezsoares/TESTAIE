import 
    app, 
    { 
      ApiError,
      BaseError,
      generateRoute,
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
      createServer,
      startServer
    } 
from '../expressium/src';

import { appRoute } from './routes';

(
  async (): Promise<void> => {
    appRoute.generateRoutes();

    const resolvedAppModule = await createServer();
    
    startServer(resolvedAppModule);
  }
)();
