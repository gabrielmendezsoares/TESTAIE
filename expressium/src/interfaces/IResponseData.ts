import { JsonValue } from "@prisma/client/runtime/library";

/**
 * ## IResponseData
 * 
 * Standard structure for HTTP response data objects.
 * 
 * @description This interface defines the consistent contract that all response data objects must follow
 * when handling HTTP responses. It enforces a standardized format across all API endpoints,
 * ensuring that clients receive uniformly structured responses regardless of the service.
 * 
 * The interface includes:
 * 
 * - Operational metadata (status indicators, timestamps, request context)
 * - User-facing information (messages and suggestions)
 * 
 * This structure facilitates consistent error handling, logging, and client-side processing
 * by maintaining predictable response formats throughout the application.
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
 * Specialized response data structure for authentication operations.
 * 
 * @description This interface extends the standard response pattern with authentication-specific
 * fields required for client authorization flows. It provides a consistent structure for responses
 * from login, token refresh, and other authentication-related endpoints.
 * 
 * In addition to standard response fields, it includes authentication context data such as:
 * 
 * - User identity information
 * - Authorization credentials (JWT token)
 * - Session metadata (expiration)
 * - Role-based access control information
 * 
 * This standardized format ensures that authentication flows can be consistently implemented
 * across different clients (web, mobile, API consumers) while maintaining proper security practices.
 */
export interface IAuthenticationResponseData {
  status: boolean;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  data: {
    username: string;
    roleList: JsonValue;
    token: string;
    expiresIn: number;
  };
}
