import axios from 'axios';
import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * ## OAuth2Strategy
 * 
 * Simple authentication strategy that uses OAuth2 tokens for authentication.
 * 
 * @description The OAuth2Strategy class provides an
 * authentication strategy that uses OAuth2 tokens for authentication. This strategy
 * is useful for authenticating requests to APIs that require OAuth2 tokens for access.
 * 
 * @method authenticate - Authenticates the request by adding the OAuth2 token to the headers.
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
   * @description This property holds the expiration date of the current access token.
   * 
   * @private
   */
  private expiresAt: Date;

  /**
   * ## constructor
   * 
   * Creates a new OAuth2Strategy instance.
   * 
   * @description Initializes the OAuth2 client ID, client secret, token URL, and initial token data.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param clientId - OAuth2 client ID.
   * @param clientSecret - OAuth2 client secret.
   * @param tokenUrl - OAuth2 token URL.
   * @param initialToken - Initial OAuth2 token data.
   * 
   * @throws If initial token data is missing.
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
       * Initial access token expiration time.
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
   * Authenticates the request by adding the OAuth2 token to the headers.
   * 
   * @description Adds the OAuth2 token to the headers of the request configuration.
   * 
   * @public
   * 
   * @async
   * 
   * @param configurationMap - The request configuration to modify.
   * 
   * @returns The modified request configuration with the OAuth2 token added.
   * 
   * @throws If no valid access token is available.
   */
  public async authenticate(configurationMap: AxiosRequestConfig<any>): Promise<AxiosRequestConfig<any>> {
    if (this.shouldRefresh()) {
      await this.refresh();
    }

    if (!this.accessToken) {
      throw new Error('No valid access token available');
    }

    return {
      ...configurationMap,
      headers: {
        ...configurationMap.headers,
        Authorization: `Bearer ${ this.accessToken }`
      }
    };
  }

  /**
   * ## shouldRefresh
   * 
   * Checks if the current access token is missing or expired.
   * 
   * @description This method checks if the current access token is missing or expired. If the
   * access token is missing or expired within the next 5 minutes, a token refresh is needed.
   * 
   * @private
   * 
   * @returns True if the access token is missing or expired, false otherwise.
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
   * @description This method refreshes the OAuth2 tokens by sending a request to the token endpoint
   * with the refresh token. If the refresh token is invalid or the request fails, an error is thrown.
   * 
   * @public
   * 
   * @async
   * 
   * @throws If no refresh token is available.
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
