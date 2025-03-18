import path from 'path';
import { generateRoute } from '../../expressium/src';
import { appService } from "../services";

export const generateRoutes = (): void => {
  generateRoute(
    {
      version: 'v1',
      endpoint: `${ path.basename(process.cwd()) }/main/get/template`,
      method: 'get',
      serviceHandler: appService.getTemplate,
      requiresAuthorization: false
    }
  );
};
