import path from 'path';
import { generateRoute, dateTimeFormatterUtil } from '../../expressium/src';
import { appService } from "../services";

export const generateRoutes = (): void => {
  try {
    generateRoute(
      {
        version: 'v1',
        endpoint: `${ path.basename(process.cwd()) }/main/get/template`,
        method: 'get',
        serviceHandler: appService.getTemplate,
        requiresAuthorization: false
      }
    );
  } catch (error: unknown) {
    console.log(`Route | Timestamp: ${ dateTimeFormatterUtil.formatAsDayMonthYearHoursMinutesSeconds(new Date()) } | Name: generateRoutes | Error: ${ error instanceof Error ? error.message : String(error) }`);
    process.exit(1);
  }
};
