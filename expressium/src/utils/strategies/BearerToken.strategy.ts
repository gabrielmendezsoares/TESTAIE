import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * ## BearerTokenStrategy
 * 
 * Simple authentication strategy that adds a bearer token to the headers of a request.
 * 
 * @description The BearerTokenStrategy class provides a simple authentication strategy
 * that adds a bearer token to the headers of a request. This strategy is useful for
 * authenticating requests to APIs that require a bearer token for access. 
 * 
 * @method authenticate - Authenticates the request by adding the bearer token to the headers.
 */
export class BearerTokenStrategy implements IAuthenticationStrategy.IAuthenticationStrategy {
  /**
   * ## constructor
   * 
   * Creates a new BearerTokenStrategy instance.
   * 
   * @description Initializes the bearer token for the strategy.
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
   * Authenticates the request by adding the bearer token to the headers.
   * 
   * @description Adds the bearer token to the headers of the request configuration.
   * 
   * @public
   * 
   * @param configurationMap - The request configuration to modify.
   * 
   * @returns The modified request configuration with the bearer token added.
   */
  public authenticate(configurationMap: AxiosRequestConfig<any>): AxiosRequestConfig<any> {
    return {
      ...configurationMap,
      headers: {
        ...configurationMap.headers,
        Authorization: `Bearer ${ this.token }`
      }
    };
  }
}
