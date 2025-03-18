import axios from 'axios';
import { AxiosRequestConfig } from 'axios/index';
import { IAuthenticationStrategy } from './interfaces';

/**
 * ## OAuth2Strategy
 * 
 * Authentication strategy that implements the OAuth 2.0 authorization framework.
 * 
 * @description The OAuth2Strategy class provides a comprehensive authentication strategy
 * that implements the OAuth 2.0 authorization framework for API access. This strategy
 * handles the complete token lifecycle including:
 * 
 * - Using existing access tokens for API requests
 * - Automatic token refresh when tokens expire
 * - Proper Bearer token authorization header formatting
 * 
 * This strategy is particularly useful for authenticating requests to APIs that implement
 * the OAuth 2.0 protocol, such as Google, Microsoft, Facebook, and many other modern API services.
 * 
 * The implementation follows the OAuth 2.0 specification (RFC 6749) and Bearer Token
 * Usage specification (RFC 6750).
 * 
 * @method authenticate - Authenticates the request by adding the OAuth2 token to the headers.
 * @method refresh - Refreshes the OAuth2 tokens.
 */
export class OAuth2Strategy implements IAuthenticationStrategy.IAuthenticationStrategy {
  /**
   * ## accessToken
   * 
   * OAuth2 access token used for API authorization.
   * 
   * @description This property holds the current OAuth2 access token used for authenticating
   * API requests. Access tokens are short-lived credentials that grant access to protected
   * resources on behalf of the resource owner.
   * 
   * The token is included in the Authorization header of API requests with the
   * Bearer token scheme.
   * 
   * @private
   */
  private accessToken: string;

  /**
   * ## refreshToken
   * 
   * OAuth2 refresh token used to obtain new access tokens.
   * 
   * @description This property holds the current OAuth2 refresh token used to obtain new
   * access tokens when the current token expires. Refresh tokens are long-lived credentials
   * that can be used to obtain new access tokens without requiring the user to re-authenticate.
   * 
   * The refresh token is sent to the token endpoint during the token refresh process.
   * 
   * @private
   */
  private refreshToken: string;

  /**
   * ## expiresAt
   * 
   * Date object representing when the current access token expires.
   * 
   * @description This property holds the expiration date of the current access token.
   * It is used to determine when a token refresh is needed before making API requests.
   * The strategy will automatically refresh the token when it is about to expire
   * (within a 5-minute buffer).
   * 
   * @private
   */
  private expiresAt: Date;

  /**
   * ## constructor
   * 
   * Creates a new OAuth2Strategy instance.
   * 
   * @description Initializes the OAuth2 strategy with the necessary client credentials
   * and token endpoint URL, along with initial token data. The strategy requires
   * existing tokens to be provided during initialization.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param clientId - The client identifier issued to the client during application registration.
   * @param clientSecret - The client secret issued to the client during application registration.
   * @param tokenUrl - The URL of the authorization server's token endpoint used for token refresh.
   * @param initialToken - Initial OAuth2 token data including access token, refresh token, and expiration.
   * 
   * @throws If initial token data is missing or incomplete.
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
       * Initial access token for API authorization.
       * 
       * @description This property holds the initial access token used for authentication.
       * Must be a valid OAuth 2.0 access token obtained from the authorization server.
       */
      accessToken: string;

      /**
       * ## refreshToken
       * 
       * Initial refresh token for obtaining new access tokens.
       * 
       * @description This property holds the initial refresh token used to obtain new access tokens.
       * Must be a valid OAuth 2.0 refresh token obtained from the authorization server.
       */
      refreshToken: string;

      /**
       * ## expiresIn
       * 
       * Initial access token expiration time in seconds.
       * 
       * @description This property holds the expiration time of the initial access token in seconds.
       * This value is used to calculate the expiration date of the token.
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
   * @description This method ensures a valid access token is available by checking
   * if the current token is expired and refreshing it if necessary. It then adds
   * the access token to the request headers using the Bearer token authentication scheme.
   * 
   * The method follows the OAuth 2.0 Bearer Token Usage specification (RFC 6750) for
   * formatting the Authorization header.
   * 
   * @public
   * 
   * @async
   * 
   * @param configurationMap - The Axios request configuration to modify.
   * 
   * @returns A promise that resolves to the modified request
   * configuration with the OAuth2 token added.
   * 
   * @throws If no valid access token is available and token refresh fails.
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
   * Checks if the current access token needs to be refreshed.
   * 
   * @description This method determines if the current access token needs to be refreshed
   * based on its expiration time. To prevent API requests from failing due to token expiration,
   * the method considers tokens that will expire within the next 5 minutes (300000 milliseconds)
   * as requiring a refresh.
   * 
   * The method returns true if any of the following conditions are met:
   * 
   * - The access token is missing
   * - The expiration date is missing
   * - The token will expire within the next 5 minutes
   * 
   * @private
   * 
   * @returns True if the token needs to be refreshed, false otherwise.
   */
  private shouldRefresh(): boolean {
    return !this.accessToken 
      || !this.expiresAt 
      || Date.now() >= this.expiresAt.getTime() - 300000;
  }

  /**
   * ## refresh
   * 
   * Refreshes the OAuth2 tokens using the refresh token flow.
   * 
   * @description This method refreshes the OAuth2 tokens by sending a request to the token endpoint
   * with the refresh token grant type. It follows the OAuth 2.0 specification (RFC 6749)
   * for the refresh token flow.
   * 
   * On successful refresh, the method updates:
   * 
   * - The access token with the new token
   * - The refresh token if a new one is provided (some providers don't issue new refresh tokens)
   * - The expiration date based on the new token's expiration time
   * 
   * @public
   * 
   * @async
   * 
   * @throws If no refresh token is available or if the token refresh request fails.
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
