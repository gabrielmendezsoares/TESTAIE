import { JsonValue } from "@prisma/client/runtime/library";

/**
 * ## IResponseData
 * 
 * Standard structure for HTTP response data.
 * 
 * @description Defines the contract that all response data objects must follow when dealing with
 * HTTP responses. This interface specifies the properties that must be included in response data
 * objects for consistent formatting across different services.
 */
export interface IResponseData {
  status: boolean;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string;
  suggestion: string;
}

/**
 * ## IAuthenticationResponseData
 * 
 * Standard structure for authentication response data.
 * 
 * @description Defines the contract that all authentication response data objects must follow when
 * dealing with HTTP responses. This interface specifies the properties that must be included in
 * authentication response data objects for consistent formatting across different services.
 */
export interface IAuthenticationResponseData {
  username: string;
  roleList: JsonValue;
  token: string;
  expiresIn: number;
}
