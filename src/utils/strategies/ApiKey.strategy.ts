import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * @class ApiKeyStrategy
 * 
 * @describe API key authentication strategy.
 * 
 * @description Implements authentication using an API key in a header.
 * 
 * @method authenticate - Adds the API key to the request configuration.
 */
export class ApiKeyStrategy implements IAuthenticationStrategy.IAuthenticationStrategy {
  /**
   * @public
   * @constructor
   * 
   * @describe Creates a new API key authentication strategy.
   * 
   * @description The strategy uses the provided API key and header name to authenticate requests.
   * 
   * @param apiKey - The API key to use.
   * @param headerName - The header name for the API key.
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
   * @public
   * 
   * @describe Adds the API key to the request configuration.
   * 
   * @description This method modifies the request configuration by adding the API key to the headers.
   * 
   * @param configuration - The request configuration to authenticate.
   * 
   * @returns Modified configuration with API key.
   * 
   * @example
   * // Authenticate a request using the API key strategy
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
        [this.headerName]: this.apiKey
      }
    };
  }
}
