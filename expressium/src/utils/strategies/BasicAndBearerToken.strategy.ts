import axios from 'axios';
import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * ## BasicAndBearerTokenStrategy
 * 
 * Authentication strategy that combines basic authentication with bearer token authentication.
 * 
 * @description The BasicAndBearerTokenStrategy class provides a sophisticated authentication strategy
 * that uses basic authentication (username/password) to obtain a bearer token, and then uses that
 * token for subsequent API requests. This strategy is particularly useful for APIs that:
 * 
 * - Require initial authentication via basic auth to obtain a short-lived access token
 * - Use bearer tokens for subsequent request authorization
 * - Have token expiration mechanisms requiring periodic token refresh
 * 
 * The strategy handles token lifecycle management including:
 * 
 * - Initial token acquisition using basic auth credentials
 * - Automatic token refresh when expired
 * - Manual token invalidation when needed
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
   * @description This token is used to authenticate subsequent requests to the API.
   * It is obtained using basic authentication credentials and stored until expiration.
   * A null value indicates that no valid token is currently available.
   * 
   * @private
   */
  private bearerToken: string | null = null;

  /**
   * ## tokenExpiresAt
   * 
   * The timestamp (in milliseconds since epoch) when the bearer token expires.
   * 
   * @description This timestamp is used to determine if the current token is still valid
   * before making API requests. The strategy will automatically refresh the token
   * if it has expired or is about to expire based on the tokenExpirationBuffer.
   * 
   * @private
   */
  private tokenExpiresAt: number = 0;

  /**
   * ## constructor
   * 
   * Creates a new BasicAndBearerTokenStrategy instance.
   * 
   * @description Initializes the authentication strategy with the necessary parameters
   * for obtaining and managing bearer tokens. This includes the HTTP method and endpoint
   * used for authentication, basic auth credentials, and optional parameters for token
   * extraction and expiration handling.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param method - The HTTP method to use for the authentication request (e.g., 'get', 'post').
   * @param endpoint - The URL of the authentication endpoint used to obtain the bearer token.
   * @param username - The username for basic authentication to the token endpoint.
   * @param password - The password for basic authentication to the token endpoint.
   * @param tokenExpirationBuffer - Time in milliseconds to renew the token before its actual expiration (default 60 seconds). This creates a safety margin to prevent using tokens that are about to expire.
   * @param tokenExtractor - Custom function to extract the token string from the authentication response. Defaults to extracting from `response.data.data.token`.
   * @param expirationExtractor - Custom function to extract the expiration time (in milliseconds) from the authentication response. Defaults to extracting from `response.data.data.expiresIn`.
   * 
   * @throws May throw an error if invalid parameters are provided.
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
   * Obtains a new bearer token from the authentication endpoint.
   * 
   * @description This method sends an authentication request to the configured endpoint
   * using the provided basic authentication credentials. It extracts the token and its
   * expiration time from the response using the configured extractor functions, and stores
   * them for use in subsequent API requests.
   * 
   * The method handles error cases and provides meaningful error messages if token
   * acquisition fails.
   * 
   * @private
   * 
   * @async
   * 
   * @returns A promise that resolves to the bearer token obtained from the authentication endpoint.
   * 
   * @throws Throws an error if the authentication request fails or if the token cannot be extracted.
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
   * Checks if the current bearer token is valid and not expired.
   * 
   * @description This method determines if the currently stored bearer token is valid
   * by checking if it exists and if its expiration time has not been reached.
   * The comparison includes the configured expiration buffer to ensure tokens are
   * refreshed before they actually expire.
   * 
   * @private
   * 
   * @returns True if the token is valid and not expired, false otherwise.
   */
  private isTokenValid(): boolean {
    return !!this.bearerToken && Date.now() < this.tokenExpiresAt;
  }

  /**
   * ## invalidateToken
   * 
   * Forces the strategy to obtain a new token on the next request.
   * 
   * @description This method manually invalidates the current bearer token by
   * clearing it and resetting the expiration timestamp. This forces the strategy
   * to obtain a new token on the next API request.
   * 
   * This is useful in scenarios such as:
   * 
   * - When a token is known to be compromised
   * - After receiving authentication errors despite having a token
   * - When server-side token invalidation has occurred
   * - When switching users or contexts in the application
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
   * @description This method ensures a valid bearer token is available, obtaining a new one
   * if necessary, and then adds it to the request configuration's Authorization header.
   * 
   * The method:
   * 
   * 1. Checks if the current token is valid
   * 2. Obtains a new token if needed
   * 3. Adds the token to the request headers
   * 4. Preserves any existing headers in the request configuration
   * 
   * This implementation follows the OAuth 2.0 Bearer Token Usage specification (RFC 6750).
   * 
   * @async
   * 
   * @public
   * 
   * @param configurationMap - The Axios request configuration to modify.
   * 
   * @returns A promise that resolves to the modified request
   * configuration with the bearer token added.
   * 
   * @throws May throw an error if token acquisition fails.
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
