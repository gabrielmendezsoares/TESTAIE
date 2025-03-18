import { AxiosRequestConfig } from 'axios/index';

/**
 * ## IAuthenticationStrategy
 * 
 * Standard interface for authentication strategies.
 * 
 * @description Defines the contract that all authentication strategies must follow when
 * implementing custom authentication logic. This interface specifies two methods that
 * must be implemented to authenticate and refresh authentication credentials.
 * 
 * @method authenticate - Authenticates an HTTP request by modifying its configuration.
 * @method refresh - Refreshes the authentication credentials if supported.
 */
export interface IAuthenticationStrategy {
  /**
   * ## authenticate
   * 
   * Authenticates an HTTP request by modifying its configuration.
   * 
   * @description This method is required and should be implemented to authenticate an
   * HTTP request by modifying its configuration. It should return a promise that resolves
   * with the modified request configuration, including any authentication credentials
   * that are required to access the requested resource.
   * 
   * @param configurationMap - Request configuration to modify with authentication credentials.
   * 
   * @returns Promise that resolves with the modified request configuration.
   */
  authenticate(configurationMap: AxiosRequestConfig<any>): Promise<AxiosRequestConfig<any>> | AxiosRequestConfig<any>;
  
  /**
   * ## refresh
   * 
   * Standard interface for authentication strategies in the application.
   * 
   * @description Defines the contract that all authentication strategies must follow when
   * implementing custom authentication logic. This interface specifies methods that
   * must be implemented to authenticate HTTP requests and optionally refresh authentication credentials.
   * 
   * Authentication strategies can include various mechanisms such as:
   * 
   * - Bearer token authentication
   * - Basic authentication
   * - OAuth2 flows
   * - API key authentication
   * - JWT authentication
   * - Custom authentication schemes
   * 
   * Implementations of this interface should handle token storage, retrieval, and application
   * to outgoing requests as appropriate for the specific authentication mechanism.
   * 
   * @returns Promise that resolves when the refresh is complete.
   */
  refresh?(): Promise<void>;
}
