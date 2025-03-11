import axios from 'axios';
import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * ## OAuth2Strategy
 * 
 * OAuth2 authentication strategy.
 * 
 * @description Handles OAuth2 token management including automatic refresh of expired tokens.
 * 
 * @method authenticate - Authenticates a request, refreshing the token if necessary.
 * @method refresh - Refreshes the OAuth2 tokens.
 */
export class OAuth2Strategy implements IAuthenticationStrategy.IAuthenticationStrategy {
  /**
   * ## accessToken
   * 
   * OAuth2 access token.
   * 
   * @description This property holds the current OAuth2 access token used for authentication.
   * 
   * @private
   */
  private accessToken: string;

  /**
   * ## refreshToken
   * 
   * OAuth2 refresh token.
   * 
   * @description This property holds the current OAuth2 refresh token used to obtain new access tokens.
   * 
   * @private
   */
  private refreshToken: string;

  /**
   * ## expiresAt
   * 
   * Token expiration date.
   * 
   * @description This property holds the date and time when the current access token expires.
   * 
   * @private
   */
  private expiresAt: Date;

  /**
   * ## constructor
   * 
   * Creates a new OAuth2 authentication strategy.
   * 
   * @description The strategy uses the provided OAuth2 client ID, client secret, and token URL
   * to manage OAuth2 tokens. An initial token can be provided to start with a valid
   * access token and refresh token.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param clientId - OAuth2 client ID.
   * @param clientSecret - OAuth2 client secret.
   * @param tokenUrl - URL for token refresh requests.
   * @param initialToken - Optional initial token data.
   * 
   * @throws If no initial token is provided or token refresh fails.
   * 
   * @example
   * // Create a new OAuth2 authentication strategy
   * 
   * const strategy = new OAuth2Strategy(
   *   'client-id',
   *   'client-secret',
   *   'https://auth.example.com/token',
   *   {
   *     accessToken,
   *     refreshToken,
   *     expiresIn
   *   }
   * );
   */
  public constructor(
    /**
     * @private
     * @readonly
     */
    private readonly clientId: string,

    /**
     * @private
     * @readonly
     */
    private readonly clientSecret: string,

    /**
     * @private
     * @readonly
     */
    private readonly tokenUrl: string,

    /**
     * @public
     */
    public initialToken?: {
      /**
       * ## accessToken
       * 
       * Initial access token.
       * 
       * @description This property holds the initial access token used for authentication.
       */
      accessToken: string;

      /**
       * ## refreshToken
       * 
       * Initial refresh token.
       * 
       * @description This property holds the initial refresh token used to obtain new access tokens.
       */
      refreshToken: string;

      /**
       * ## expiresIn
       * 
       * Token expiration time in seconds.
       * 
       * @description This property holds the expiration time of the initial access token in seconds.
       */
      expiresIn: number;
    }
  ) {
    if (!initialToken) {
      throw new Error('Initial token configuration is required for OAuth2Strategy');
    }

    this.accessToken = initialToken.accessToken;
    this.refreshToken = initialToken.refreshToken;
    this.expiresAt = new Date(Date.now() + initialToken.expiresIn * 1000);

    if (!this.accessToken || !this.refreshToken) {
      throw new Error('Both accessToken and refreshToken are required for OAuth2Strategy');
    }
  }

  /**
   * ## authenticate
   * 
   * Authenticates a request, refreshing the token if necessary.
   * 
   * @description This method checks if the current access token is valid and not expired.
   * If the token is expired or missing, it attempts to refresh the token using
   * the refresh token. If the refresh token is missing or invalid, an error is thrown.
   * 
   * @public
   * 
   * @async
   * 
   * @param configuration - The request configuration to authenticate.
   * 
   * @returns Modified configuration with valid OAuth2 token.
   * 
   * @throws If authentication fails or tokens are invalid.
   * 
   * @example
   * // Authenticate a request using the OAuth2 token
   * 
   * const authenticated = await strategy.authenticate({ url: 'https://api.example.com/data' });
   */
  public async authenticate(configuration: AxiosRequestConfig<any>): Promise<AxiosRequestConfig<any>> {
    if (this.shouldRefresh()) {
      await this.refresh();
    }

    if (!this.accessToken) {
      throw new Error('No valid access token available');
    }

    return {
      ...configuration,
      headers: {
        ...configuration.headers,
        Authorization: `Bearer ${ this.accessToken }`
      }
    };
  }

  /**
   * ## shouldRefresh
   * 
   * Checks if the current token needs to be refreshed.
   * 
   * @description This method checks if the current access token is missing or expired.
   * 
   * @private
   * 
   * @returns True if token refresh is needed.
   */
  private shouldRefresh(): boolean {
    return !this.accessToken 
      || !this.expiresAt 
      || Date.now() >= this.expiresAt.getTime() - 300000;
  }

  /**
   * ## refresh
   * 
   * Refreshes the OAuth2 tokens.
   * 
   * @description This method sends a token refresh request to the token URL using the current
   * refresh token. If the refresh token is missing or invalid, an error is thrown.
   * 
   * @public
   * 
   * @async
   * 
   * @throws If token refresh fails or refresh token is invalid.
   * 
   * @example
   * // Refresh the OAuth2 tokens
   * 
   * await strategy.refresh();
   */
  public async refresh(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const params = new URLSearchParams(
      {
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken,
        client_id: this.clientId,
        client_secret: this.clientSecret
      }
    );

    try {
      const response = await axios.post<any>(
        this.tokenUrl, 
        params.toString(), 
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      if (!response.data.access_token) {
        throw new Error('No access token received from token endpoint');
      }

      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token ?? this.refreshToken;
      this.expiresAt = new Date(Date.now() + response.data.expires_in * 1000);
    } catch (error: unknown) {
      throw new Error(`Failed to refresh OAuth2 token: ${ error instanceof Error ? error.message : 'Unknown error' }`);
    }
  }
}
