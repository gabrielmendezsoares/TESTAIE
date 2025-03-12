import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * ## BearerTokenStrategy
 * 
 * Bearer token authentication strategy.
 * 
 * @description Implements authentication using a bearer token in the Authorization header.
 * 
 * @method authenticate - Adds the bearer token to the request configuration.
 */
export class BearerTokenStrategy implements IAuthenticationStrategy.IAuthenticationStrategy {
  /**
   * ## constructor
   * 
   * Creates a new bearer token authentication strategy.
   * 
   * @description The strategy uses the provided bearer token to authenticate requests.
   * 
   * @public
   * 
   * @constructor
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
   * ## authenticate
   * 
   * Adds the bearer token to the request configuration.
   * 
   * @description This method modifies the request configuration to include the bearer
   * token in the Authorization header.
   * 
   * @public
   * 
   * @param configuration - The request configuration to authenticate.
   * 
   * @returns Modified configuration with bearer token.
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
