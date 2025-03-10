import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * @class BearerTokenStrategy
 * 
 * @describe Bearer token authentication strategy.
 * 
 * @description Implements authentication using a bearer token in the Authorization header.
 * 
 * @method authenticate - Adds the bearer token to the request configuration.
 */
export class BearerTokenStrategy implements IAuthenticationStrategy.IAuthenticationStrategy {
  /**
   * @public
   * 
   * @constructor
   * 
   * @describe Creates a new bearer token authentication strategy.
   * 
   * @description The strategy uses the provided bearer token to authenticate requests.
   * 
   * @param token - The bearer token to use for authentication.
   */
  public constructor(
    /**
     * @private
     * @readonly
     */
    private readonly token: string
  ) {}

  /**
   * @public
   * 
   * @describe Adds the bearer token to the request configuration.
   * 
   * @description This method modifies the request configuration to include the bearer
   * token in the Authorization header.
   * 
   * @param configuration - The request configuration to authenticate.
   * 
   * @returns Modified configuration with bearer token.
   * 
   * @example
   * // Authenticate a request using the bearer token strategy
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
      headers: {
        ...configuration.headers,
        Authorization: `Bearer ${ this.token }`
      }
    };
  }
}
