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
   * Refreshes the authentication credentials if supported.
   * 
   * @description This method is optional and should be implemented if the authentication
   * strategy supports refreshing authentication credentials. It should return a promise
   * that resolves when the refresh is complete, or reject with an error if the refresh fails.
   * 
   * @returns Promise that resolves when the refresh is complete.
   */
  refresh?(): Promise<void>;
}
