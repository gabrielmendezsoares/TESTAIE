import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * ## BasicStrategy
 * 
 * Simple authentication strategy that adds basic credentials to the request configuration.
 * 
 * @description The BasicStrategy class provides a simple authentication strategy
 * that adds basic credentials to the request configuration. This strategy is useful
 * for authenticating requests to APIs that require basic authentication.
 * 
 * @method authenticate - Authenticates the request by adding basic credentials to the configuration.
 */
export class BasicStrategy implements IAuthenticationStrategy.IAuthenticationStrategy {
  /**
   * ## constructor
   * 
   * Creates a new BasicStrategy instance.
   * 
   * @description Initializes the username and password for the basic credentials.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param username - The username for basic authentication.
   * @param password - The password for basic authentication.
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
   * Authenticates the request by adding basic credentials to the configuration.
   * 
   * @description Adds the basic credentials to the request configuration.
   * 
   * @public
   * 
   * @param configuration - The request configuration to modify.
   * 
   * @returns The modified request configuration with the basic credentials added.
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
