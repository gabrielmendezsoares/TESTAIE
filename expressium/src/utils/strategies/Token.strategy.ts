import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * ## TokenStrategy
 * 
 * Simple authentication strategy that adds a token to the headers of a request.
 * 
 * @description The TokenStrategy class provides a simple authentication strategy
 * that adds a token to the HTTP headers of a request. This strategy is useful for
 * authenticating requests to APIs that require a token for access, such as OAuth 2.0
 * protected endpoints or JWT-based authentication systems.
 * 
 * The token is added to the Authorization header with the 'Bearer' prefix as per the
 * standard OAuth 2.0 token usage specification (RFC 6750).
 * 
 * @method authenticate - Authenticates the request by adding the token to the headers.
 */
export class TokenStrategy implements IAuthenticationStrategy.IAuthenticationStrategy {
  /**
   * ## constructor
   * 
   * Creates a new TokenStrategy instance.
   * 
   * @description Initializes the token for the strategy.
   * This token will be used to generate the Authorization header.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param token - The token to use for authentication. This value will be sent with each request.
   * 
   * @throws May throw an error if the token is empty or invalid.
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
   * Authenticates the request by adding the token to the headers.
   * 
   * @description Adds the token to the Authorization header of the request configuration.
   * The token is prefixed with 'Bearer ' as per the OAuth 2.0 specification.
   * This method preserves any existing headers in the request configuration and
   * only adds or updates the Authorization header.
   * 
   * @public
   * 
   * @param configurationMap - The Axios request configuration to modify.
   * 
   * @returns The modified request configuration with the token added to the Authorization header.
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
