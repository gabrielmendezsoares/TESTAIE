import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * ## ApiKeyStrategy
 * 
 * API key authentication strategy.
 * 
 * @description Implements authentication using an API key in a header.
 * 
 * @method authenticate - Adds the API key to the request configuration.
 */
export class ApiKeyStrategy implements IAuthenticationStrategy.IAuthenticationStrategy {
  /**
   * ## constructor
   * 
   * Creates a new API key authentication strategy.
   * 
   * @description The strategy uses the provided API key and header name to authenticate requests.
   * 
   * @public
   * 
   * @constructor
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
   * ## authenticate
   * 
   * Adds the API key to the request configuration.
   * 
   * @description This method modifies the request configuration by adding the API key to the headers.
   * 
   * @public
   * 
   * @param configuration - The request configuration to authenticate.
   * 
   * @returns Modified configuration with API key.
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
