import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * ## ApiKeyStrategy
 * 
 * Simple authentication strategy that adds an API key to the headers of a request.
 * 
 * @description The ApiKeyStrategy class provides a simple authentication strategy
 * that adds an API key to the headers of a request. This strategy is useful for
 * authenticating requests to APIs that require an API key for access.
 * 
 * @method authenticate - Authenticates the request by adding the API key to the headers.
 */
export class ApiKeyStrategy implements IAuthenticationStrategy.IAuthenticationStrategy {
  /**
   * ## constructor
   * 
   * Creates a new ApiKeyStrategy instance.
   * 
   * @description Initializes the API key and header name for the strategy.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param apiKey - The API key to use for authentication.
   * @param headerName - The name of the header to use for the API key.
   */
  public constructor(
    /**
     * @private
     * @readonly
     */
    private readonly apiKey: string,

    /**
     * @private
     * @readonly
     */
    private readonly headerName: string = 'X-API-Key'
  ) {}

  /**
   * ## authenticate
   * 
   * Authenticates the request by adding the API key to the headers.
   * 
   * @description Adds the API key to the headers of the request configuration.
   * 
   * @public
   * 
   * @param configuration - The request configuration to modify.
   * 
   * @returns The modified request configuration with the API key added.
   */
  public authenticate(configuration: AxiosRequestConfig<any>): AxiosRequestConfig<any> {
    return {
      ...configuration,
      headers: {
        ...configuration.headers,
        [this.headerName]: this.apiKey
      }
    };
  }
}
