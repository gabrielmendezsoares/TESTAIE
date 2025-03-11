import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * ## BasicStrategy
 * 
 * Basic authentication strategy.
 * 
 * @description Implements authentication using basic in the Authorization header.
 * 
 * @method authenticate - Adds basic credentials to the request configuration.
 */
export class BasicStrategy implements IAuthenticationStrategy.IAuthenticationStrategy {
  /**
   * ## constructor
   * 
   * Creates a new basic authentication strategy.
   * 
   * @description The strategy uses the provided username and password to authenticate requests.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param username - Username for basic.
   * @param password - Password for basic.
   */
  public constructor(
    /**
     * @private
     * @readonly
     */
    private readonly username: string,

    /**
     * @private
     * @readonly
     */
    private readonly password: string
  ) {}

  /**
   * ## authenticate
   * 
   * Adds basic credentials to the request configuration.
   * 
   * @description This method modifies the request configuration to include the basic
   * credentials in the Authorization header.
   * 
   * @public
   * 
   * @param configuration - The request configuration to authenticate.
   * 
   * @returns Modified configuration with basic.
   * 
   * @example
   * // Authenticate a request using the basic strategy
   * 
   * const authenticated =  strategy.authenticate(
   *   {
   *     url: 'https://api.example.com/data',
   *     method: 'GET'
   *   }
   * );
   */
  public authenticate(configuration: AxiosRequestConfig<any>): AxiosRequestConfig<any> {
    return {
      ...configuration,
      auth: {
        username: this.username,
        password: this.password
      }
    };
  }
}
