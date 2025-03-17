import axios from 'axios';
import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * ## BasicAndBearerTokenStrategy
 * 
 * Simple authentication strategy that combines basic and bearer token authentication.
 * 
 * @description The BasicAndBearerTokenStrategy class provides an authentication strategy
 * that combines basic and bearer token authentication. This strategy is useful for
 * authenticating requests to APIs that require both basic and bearer token authentication.
 * 
 * @method invalidateToken - Forces the strategy to obtain a new token on the next request.
 * @method authenticate - Add the bearer token to the request configuration, obtaining it first if necessary.
 */
export class BasicAndBearerTokenStrategy implements IAuthenticationStrategy.IAuthenticationStrategy {
  /**
   * ## bearerToken
   * 
   * The bearer token obtained from the authentication endpoint.
   * 
   * @description This token is used to authenticate requests to the API.
   * 
   * @private
   */
  private bearerToken: string | null = null;

  /**
   * ## tokenExpiresAt
   * 
   * The timestamp when the bearer token expires.
   * 
   * @description This timestamp is used to determine if the token is still valid.
   * 
   * @private
   */
  private tokenExpiresAt: number = 0;

  /**
   * ## constructor
   * 
   * Creates a new BasicAndBearerTokenStrategy instance.
   * 
   * @description Initializes the authentication method, endpoint, credentials, and token settings.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param method - The authentication method to use for the request (e.g., 'get', 'post').
   * @param endpoint - The authentication endpoint to use for obtaining the bearer token.
   * @param username - The username for basic authentication.
   * @param password - The password for basic authentication.
   * @param tokenExpirationBuffer - The buffer time in milliseconds to renew the token before it expires (default 60 seconds).
   * @param tokenExtractor - Function to extract token from authentication response (default extracts from data.data.token).
   * @param expirationExtractor - Function to extract expiration time from authentication response (default extracts from data.data.expiresIn).
   */
  public constructor(
    /**
     * @private
     * @readonly
     */
    private readonly method: string,

    /**
     * @private
     * @readonly
     */
    private readonly endpoint: string,

    /**
     * @private
     * @readonly
     */
    private readonly username: string,
    
    /**
     * @private
     * @readonly
     */
    private readonly password: string,
    
    /**
     * @private
     * @readonly
     */
    private readonly tokenExpirationBuffer: number = 60000,
    
    /**
     * @private
     * @readonly
     */
    private readonly tokenExtractor: (response: any) => string = (response) => response.data.data.token,
    
    /**
     * @private
     * @readonly
     */
    private readonly expirationExtractor: (response: any) => number = (response) => response.data.data.expiresIn
  ) {}

  /**
   * ## obtainToken
   * 
   * Obtains a bearer token from the authentication endpoint.
   * 
   * @description This method sends a request to the authentication endpoint using
   * the provided credentials. It extracts the token and expiration time from the
   * response and caches the token for future requests.
   * 
   * @private
   * 
   * @async
   * 
   * @returns The bearer token obtained from the authentication endpoint.
   * 
   * @throws Throws an error if the token cannot be obtained.
   */
  private async obtainToken(): Promise<string> {
    try {
      const response = await (axios as any)[this.method](
        this.endpoint,
        {
          auth: {
            username: this.username,
            password: this.password
          }
        }
      );

      const token = this.tokenExtractor(response);
      const expiresIn = this.expirationExtractor(response);
      
      this.bearerToken = token;
      this.tokenExpiresAt = Date.now() + expiresIn - this.tokenExpirationBuffer;
      
      return token;
    } catch (error: unknown) {
      console.error('Failed to obtain bearer token:', error instanceof Error ? error.message : String(error));
      
      throw new Error('Authentication failed: Unable to obtain bearer token');
    }
  }

  /**
   * ## isTokenValid
   * 
   * Checks if the current token is valid.
   * 
   * @description This method checks if the current bearer token is still valid
   * by comparing the expiration timestamp to the current time.
   * 
   * @private
   * 
   * @returns True if the token is valid, false otherwise.
   */
  private isTokenValid(): boolean {
    return !!this.bearerToken && Date.now() < this.tokenExpiresAt;
  }

  /**
   * ## invalidateToken
   * 
   * Forces the strategy to obtain a new token on the next request.
   * 
   * @description This method invalidates the current bearer token, forcing the
   * strategy to obtain a new token on the next request.
   * 
   * @public
   */
  public invalidateToken(): void {
    this.bearerToken = null;
    this.tokenExpiresAt = 0;
  }

  /**
   * ## authenticate
   * 
   * Authenticates the request by adding the bearer token to the configuration.
   * 
   * @description Adds the bearer token to the request configuration, obtaining
   * it first if necessary. This method ensures that the token is valid before
   * adding it to the request headers.
   * 
   * @async
   * 
   * @public
   * 
   * @param configurationMap - The request configuration to modify.
   * 
   * @returns The modified request configuration with the bearer token added.
   */
  public async authenticate(configurationMap: AxiosRequestConfig<any>): Promise<AxiosRequestConfig<any>> {
    if (!this.isTokenValid()) {
      await this.obtainToken();
    }

    return {
      ...configurationMap,
      headers: {
        ...configurationMap.headers,
        Authorization: `Bearer ${this.bearerToken}`
      }
    };
  }
}
