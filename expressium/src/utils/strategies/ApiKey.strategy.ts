import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * ## ApiKeyStrategy
 * 
 * Simple authentication strategy that adds an API key to the headers of a request.
 * 
 * @description The ApiKeyStrategy class provides a simple authentication strategy
 * that adds an API key to the HTTP headers of a request. This strategy is useful for
 * authenticating requests to APIs that require an API key for access.
 * 
 * The API key is added to the headers using the specified header name (defaults to 'X-API-Key').
 * This implementation preserves any existing headers in the request configuration.
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
   * The header name defaults to 'X-API-Key' if not specified.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param apiKey - The API key to use for authentication. This value will be sent with each request.
   * @param headerName - The name of the header to use for the API key. Defaults to 'X-API-Key' if not provided.
   * 
   * @throws May throw an error if the apiKey is empty or invalid.
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
   * This method preserves any existing headers in the request configuration and
   * only adds or updates the API key header.
   * 
   * @public
   * 
   * @param configurationMap - The Axios request configuration to modify.
   * 
   * @returns The modified request configuration with the API key added to the headers.
   */
  public authenticate(configurationMap: AxiosRequestConfig<any>): AxiosRequestConfig<any> {
    return {
      ...configurationMap,
      headers: {
        ...configurationMap.headers,
        [this.headerName]: this.apiKey
      }
    };
  }
}
