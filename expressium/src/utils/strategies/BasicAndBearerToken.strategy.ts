import axios from 'axios';
import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * ## BasicAndBearerTokenStrategy
 * 
 * Combined authentication strategy using Basic and Bearer tokens.
 * 
 * @description This strategy first obtains a Bearer token using Basic authentication
 * credentials, then uses that token for subsequent requests. The token is cached
 * until it expires.
 * 
 * @method authenticate - Adds the bearer token to the request configuration,
 * obtaining it first if necessary.
 */
export class BasicAndBearerTokenStrategy implements IAuthenticationStrategy.IAuthenticationStrategy {
  /**
   * ## bearerToken
   * 
   * Current bearer token obtained from the authentication endpoint.
   * 
   * @description This token is used for subsequent requests until it expires.
   * 
   * @private
   */
  private bearerToken: string | null = null;

  /**
   * ## tokenExpiresAt
   * 
   * Timestamp when the current token expires.
   * 
   * @description This timestamp is used to determine if the token is still valid.
   * 
   * @private
   */
  private tokenExpiresAt: number = 0;

  /**
   * ## constructor
   * 
   * Creates a new basic and bearer token authentication strategy.
   * 
   * @description The strategy uses the provided username and password to obtain
   * a bearer token, which is then used for subsequent requests.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param username - Username for basic auth.
   * @param password - Password for basic auth.
   * @param endpoint - The endpoint to request a token from.
   * @param tokenExpirationBuffer - Buffer time in ms before token expiration to refresh (default: 60000ms).
   * @param tokenExtractor - Function to extract token from auth response (default extracts from data.data.token).
   * @param expirationExtractor - Function to extract expiration from auth response (default extracts from data.data.expiresIn).
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
    private readonly password: string,
    
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
   * @description This method makes a request to the authentication endpoint using
   * the basic authentication credentials to obtain a bearer token.
   * 
   * @private
   * 
   * @async
   * 
   * @returns Promise resolving to the bearer token.
   * 
   * @throws If the request fails.
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
      
      this.tokenExpiresAt = Date.now() + expiresIn - this.tokenExpirationBuffer;
      this.bearerToken = token;
      
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
   * @description This method checks if the current token exists and has not expired.
   * 
   * @private
   * 
   * @returns True if the token is valid, false otherwise.
   */
  private isTokenValid(): boolean {
    return !!this.bearerToken && Date.now() < this.tokenExpiresAt;
  }

  /**
   * ## authenticate
   * 
   * Adds the bearer token to the request configuration.
   * 
   * @description This method modifies the request configuration to include the bearer
   * token in the Authorization header. It obtains a new token if necessary.
   * 
   * @async
   * 
   * @public
   * 
   * @param configuration - The request configuration to authenticate.
   * 
   * @returns Modified configuration with bearer token.
   */
  public async authenticate(configuration: AxiosRequestConfig<any>): Promise<AxiosRequestConfig<any>> {
    if (!this.isTokenValid()) {
      await this.obtainToken();
    }

    return {
      ...configuration,
      headers: {
        ...configuration.headers,
        Authorization: `Bearer ${this.bearerToken}`
      }
    };
  }

  /**
   * ## invalidateToken
   * 
   * Invalidates the current token.
   * 
   * @description This method can be called to force the strategy to obtain a new token
   * on the next request, for example after receiving a 401 response.
   * 
   * @public
   */
  public invalidateToken(): void {
    this.bearerToken = null;
    this.tokenExpiresAt = 0;
  }
}
