import path from 'path';

import 
    app, 
    { 
      ApiError,
      BaseError,
      ICustomError,
      IReqBody,
      IResponse,
      IResponseData,
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

import { appService } from './services';

(
  async (): Promise<void> => {
    generateRoute(
      {
        version: 'v1',
        endpoint: `${ path.basename(process.cwd()) }/main/get/template`,
        method: 'get',
        service: appService.getTemplate,
        requiresAuthorization: false
      }
    )

    const resolvedAppModule = await createServer();
    
    startServer(resolvedAppModule);
  }
)();
