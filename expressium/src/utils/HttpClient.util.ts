import axios from 'axios';
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios/index';
import { IAuthenticationStrategy } from './strategies/interfaces';
import { IHttpClientConfiguration } from './interfaces';

/**
 * ## HttpClient
 * 
 * Enhanced HTTP client built on Axios with support for authentication strategies,
 * automatic retries, and request/response interceptors.
 * 
 * @description This client implements the singleton pattern to ensure a consistent configuration
 * across your application. It provides type-safe HTTP methods and standardized
 * error handling through the ApiError class.
 *  
 * @method getInstance - Gets the singleton instance of the HTTP client.
 * @method setAuthenticationStrategy - Sets the current authentication strategy for the client.
 * @method clearAuthenticationStrategy - Clears the current authentication strategy for the client.
 * @method request - Makes an HTTP request with the current authentication strategy.
 * @method get - Performs a GET request.
 * @method post - Performs a POST request.
 * @method put - Performs a PUT request.
 * @method patch - Performs a PATCH request.
 * @method delete - Performs a DELETE request.
 * @method head - Performs a HEAD request.
 * @method options - Performs a OPTIONS request.
 */
export class HttpClient {
  /**
   * ## instance
   * 
   * Singleton instance of the HTTP client.
   * 
   * @description The singleton pattern ensures that only one instance of the client is created
   * and shared across the application. This allows for consistent configuration
   * and centralized error handling.
   * 
   * @private
   * @static
   */
  private static instance?: HttpClient;

  /**
   * ## axiosInstance
   * 
   * Axios instance used for making HTTP requests.
   * 
   * @description The Axios instance is configured with the provided or default values
   * and is used to make all HTTP requests.
   * 
   * @private
   * @readonly
   */
  private readonly axiosInstance: AxiosInstance;

  /**
   * ## authenticationStrategy
   * 
   * Current authentication strategy for the client.
   * 
   * @description The authentication strategy will be applied to all subsequent requests
   * until cleared via {@link clearAuthenticationStrategy}.
   * 
   * @private
   */
  private authenticationStrategy?: IAuthenticationStrategy.IAuthenticationStrategy;
  
  /**
   * ## DEFAULT_CONFIGURATION
   * 
   * Default configuration values for the HTTP client.
   * 
   * @description These values are used when no specific configuration is provided.
   * 
   * @private
   * @readonly
   */
  private readonly DEFAULT_CONFIGURATION: Required<Pick<IHttpClientConfiguration.IHttpClientConfiguration, 'retry' | 'headers' | 'timeout'>> = {
    retry: {
      statusCodes: [408, 429, 500, 502, 503, 504],
      maxAttempts: 3,
      baseDelay: 1000
    },
    headers: { Accept: '*/*' },
    timeout: 30000
  };

  /**
   * ## constructor
   * 
   * Private constructor to enforce singleton pattern.
   * 
   * @description The constructor initializes the Axios instance with the provided configuration
   * and sets up request and response interceptors for automatic retries and error handling.
   * 
   * @private
   * 
   * @constructor
   * 
   * @param configuration - Optional configuration for the client.
   */
  private constructor(
    /**
     * @public
     */
    public configuration?: IHttpClientConfiguration.IHttpClientConfiguration
  ) {
    this.axiosInstance = this.createAxiosInstance(configuration);
    
    this.setupInterceptors(configuration?.retry);
  }

  /**
   * ## getInstance
   * 
   * Gets the singleton instance of the HTTP client.
   * 
   * @description If no instance exists, a new one is created with the provided configuration.
   * If an instance already exists, it is returned unchanged (the configuration is ignored).
   * 
   * @public
   * @static
   * 
   * @param configuration - Optional configuration for the client.
   * 
   * @returns The singleton HTTP client instance.
   */
  public static getInstance(configuration?: IHttpClientConfiguration.IHttpClientConfiguration): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(configuration);
    }
    
    return HttpClient.instance;
  }

  /**
   * ## createAxiosInstance
   * 
   * Creates an instance of Axios with the provided configuration.
   * 
   * @description The configuration is merged with the default values to ensure consistency.
   * 
   * @private
   * 
   * @param configuration - Optional configuration for the Axios instance.
   * 
   * @returns Configured Axios instance.
   */
  private createAxiosInstance(configuration?: IHttpClientConfiguration.IHttpClientConfiguration): AxiosInstance {
    return axios.create<any>(
      {
        headers: this.DEFAULT_CONFIGURATION.headers,
        timeout: this.DEFAULT_CONFIGURATION.timeout,
        ...configuration as Record<string, unknown>
      }
    ) as unknown as AxiosInstance;
  }

  /**
   * ## setAuthenticationStrategy
   * 
   * Sets the current authentication strategy for the client.
   * 
   * @description The authentication strategy will be applied to all subsequent requests
   * until cleared via {@link clearAuthenticationStrategy}.
   * 
   * @public
   * 
   * @param strategy - The authentication strategy to use.
   */
  public setAuthenticationStrategy(strategy: IAuthenticationStrategy.IAuthenticationStrategy): void {
    this.authenticationStrategy = strategy;
  }

  /**
   * ## clearAuthenticationStrategy
   * 
   * Clears the current authentication strategy for the client.
   * 
   * @description Subsequent requests will be made without authentication
   * until a new strategy is set.
   * 
   * @public
   */
  public clearAuthenticationStrategy(): void {
    this.authenticationStrategy = undefined;
  }

  /**
   * ## setupInterceptors
   * 
   * Sets up request and response interceptors.
   * 
   * @description Request interceptors:
   * - Add a unique X-Request-ID header to each request
   * - Apply the current authentication strategy if set
   * 
   * Response interceptors:
   * - Implement automatic retry for failed requests with exponential backoff
   * - Normalize errors into ApiError format
   * 
   * @private
   * 
   * @param retryConfiguration - Optional retry configuration.
   */
  private setupInterceptors(retryConfiguration?: IHttpClientConfiguration.IHttpClientConfiguration['retry']): void {
    const retry = { 
      ...this.DEFAULT_CONFIGURATION.retry, 
      ...retryConfiguration 
    };

    this.axiosInstance.interceptors.request.use(
      async (configuration: AxiosRequestConfig<any>): Promise<any> => {
        const updatedConfiguration = {
          ...configuration,
          headers: {
            ...configuration.headers,
            'X-Request-ID': crypto.randomUUID()
          }
        };

        return this.authenticationStrategy 
          ? await this.authenticationStrategy.authenticate(updatedConfiguration)
          : updatedConfiguration;
      },
      (error: Error): Promise<never> => {
        return Promise.reject(error)
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any, any>): AxiosResponse<any, any> => {
        return response;
      },
      async (error: AxiosError<unknown, any>): Promise<AxiosResponse<any, any>> => {
        const configuration = error.config as AxiosRequestConfig<any> & { _retryCount?: number };
        
        if (!configuration || !retry.statusCodes.includes(error.response?.status ?? 0)) {
          return Promise.reject(error);
        }

        configuration._retryCount = (configuration._retryCount ?? 0) + 1;
        
        if (configuration._retryCount > retry.maxAttempts) {
          return Promise.reject(error);
        }

        const delay = retry.baseDelay * Math.pow(2, configuration._retryCount - 1);
        
        await new Promise(
          (resolve: (value: unknown) => void): NodeJS.Timeout => {
            return setTimeout(resolve, delay)
          }
        );
        
        return this.axiosInstance.request(configuration);
      }
    );
  }

  /**
   * ## request
   * 
   * Makes an HTTP request with the current authentication strategy.
   * 
   * @description This is the core method used by the specific HTTP method helpers.
   * It allows for direct control over the request method, URL, data, and options.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param method - HTTP method (GET, POST, etc.).
   * @param url - Request URL.
   * @param data - Optional request body data.
   * @param options - Optional request options.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async request<T>(
    method: string,
    url: string,
    data?: unknown,
    options: AxiosRequestConfig<any> = {}
  ): Promise<AxiosResponse<T, any>> {
    return this.axiosInstance.request<T>(
      {
        method,
        url,
        data,
        ...options
      }
    );
  }

  /**
   * ## get
   * 
   * Performs a GET request.
   * 
   * @description This method is used to retrieve a resource identified by the URL.
   * For example, it can be used to fetch data from an API endpoint.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param url - Request URL.
   * @param options - Optional request options.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async get<T>(
    url: string, 
    options?: Partial<AxiosRequestConfig<any>>
  ): Promise<AxiosResponse<T, any>> {
    return this.request<T>('GET', url, undefined, options);
  }

  /**
   * ## post
   * 
   * Performs a POST request.
   * 
   * @description This method is used to create a new resource identified by the URL.
   * For example, it can be used to submit a form or upload a file.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param url - Request URL.
   * @param options - Optional request options.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async post<T>(
    url: string, 
    data?: unknown, 
    options?: Partial<AxiosRequestConfig<any>>
  ): Promise<AxiosResponse<T, any>> {
    return this.request<T>('POST', url, data, options);
  }

  /**
   * ## put
   * 
   * Performs a PUT request.
   * 
   * @description This method is used to create or update a resource identified by the URL.
   * For example, it can be used to save a new user account or update a database record.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param url - Request URL.
   * @param options - Optional request options.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async put<T>(
    url: string, 
    data?: unknown, 
    options?: Partial<AxiosRequestConfig<any>>
  ): Promise<AxiosResponse<T, any>> {
    return this.request<T>('PUT', url, data, options);
  }

  /**
   * ## patch
   * 
   * Performs a PATCH request.
   * 
   * @description This method is used to update a resource identified by the URL.
   * For example, it can be used to modify a user profile or a database record.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param url - Request URL.
   * @param options - Optional request options.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async patch<T>(
    url: string, 
    data?: unknown, 
    options?: Partial<AxiosRequestConfig<any>>
  ): Promise<AxiosResponse<T, any>> {
    return this.request<T>('PATCH', url, data, options);
  }

  /**
   * ## delete
   * 
   * Performs a DELETE request.
   * 
   * @description This method is used to delete a resource identified by the URL.
   * For example, it can be used to remove a user account or a database record.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param url - Request URL.
   * @param options - Optional request options.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async delete<T>(
    url: string, 
    options?: Partial<AxiosRequestConfig<any>>
  ): Promise<AxiosResponse<T, any>> {
    return this.request<T>('DELETE', url, undefined, options);
  }

  /**
   * ## head
   * 
   * Performs a HEAD request.
   * 
   * @description This method is used to retrieve the headers of a resource without fetching the body.
   * For example, it can be used to check if a resource exists or to get metadata.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param url - Request URL.
   * @param options - Optional request options.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async head<T>(
    url: string, 
    options?: Partial<AxiosRequestConfig<any>>
  ): Promise<AxiosResponse<T, any>> {
    return this.request<T>('HEAD', url, undefined, options);
  }

  /**
   * ## options
   * 
   * Performs a OPTIONS request.
   * 
   * @description This method is used to describe the communication options for the target resource.
   * For example, it can be used to determine the supported methods, headers, and other details.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param url - Request URL.
   * @param options - Optional request options.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async options<T>(
    url: string, 
    options?: Partial<AxiosRequestConfig<any>>
  ): Promise<AxiosResponse<T, any>> {
    return this.request<T>('OPTIONS', url, undefined, options);
  }
}
