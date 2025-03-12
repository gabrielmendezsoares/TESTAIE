import { AxiosRequestConfig } from 'axios/index';

/**
 * ## IAuthenticationStrategy
 * 
 * Base interface for all authentication strategies.
 * 
 * @description Defines the contract that all authentication implementations must follow.
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
   * @description This method receives the original request configuration and returns a modified
   * configuration that includes the necessary authentication headers or tokens.
   * 
   * @param configuration - The original request configuration.
   * 
   * @returns Modified request configuration with authentication.
   */
  authenticate(configuration: AxiosRequestConfig<any>): Promise<AxiosRequestConfig<any>> | AxiosRequestConfig<any>;
  
  /**
   * ## refresh
   * 
   * Refreshes the authentication credentials if supported.
   * 
   * @description This method is optional and only required if the strategy supports credential refresh.
   * It should be implemented to renew the authentication tokens or keys when they expire.
   * 
   * @returns Promise that resolves when refresh is complete.
   */
  refresh?(): Promise<void>;
}
