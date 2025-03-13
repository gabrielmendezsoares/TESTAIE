import axios from 'axios';
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios/index';
import { IHttpClientConfiguration } from './interfaces';
import { IAuthenticationStrategy } from './strategies/interfaces';

/**
 * ## HttpClient
 * 
 * HTTP client for making requests to the server.
 * 
 * @description This class provides a simple interface for making HTTP requests
 * to the server. It is built on top of the Axios library and provides a number
 * of convenience methods for making common types of requests, such as GET, POST,
 * PUT, PATCH, DELETE, HEAD, and OPTIONS. It also supports automatic retries for
 * failed requests and can be configured with a variety of options to customize
 * its behavior.
 *  
 * @method setAuthenticationStrategy - Sets the current authentication strategy for the client.
 * @method clearAuthenticationStrategy - Clears the current authentication strategy.
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
   * ## axiosInstance
   * 
   * Axios instance used to make requests to the server.
   * 
   * @description This Axios instance is used to make requests to the server. It
   * is configured with the provided configuration and is used to apply the current
   * authentication strategy to all requests. It is created using the createAxiosInstance
   * method and is used to make requests using the request method.
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
   * @description This property stores the current authentication strategy for the
   * client. It is used to apply the strategy to all subsequent requests and is set
   * using the setAuthenticationStrategy method. It can be cleared using the
   * clearAuthenticationStrategy method.
   * 
   * @private
   */
  private authenticationStrategy?: IAuthenticationStrategy.IAuthenticationStrategy;
  
  /**
   * ## DEFAULT_CONFIGURATION
   * 
   * Default configuration values for the Axios instance.
   * 
   * @description This object contains the default configuration values for the
   * Axios instance. It is used to ensure consistent behavior across requests and
   * to provide sensible defaults for the client. It includes settings for automatic
   * retries, default headers, and request timeout.
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
   * Creates a new HttpClient instance.
   * 
   * @description Initializes a new HttpClient instance with the provided configuration.
   * 
   * @public
   * 
   * @constructor
   * 
   * @param configuration - Configuration for the HttpClient instance.
   */
  public constructor(
    /**
     * @public
     */
    public configuration?: IHttpClientConfiguration.IHttpClientConfiguration
  ) {
    this.axiosInstance = this.createAxiosInstance(configuration);
    
    this.setupInterceptors(configuration?.retry);
  }

  /**
   * ## createAxiosInstance
   * 
   * Creates a new Axios instance with the provided configuration.
   * 
   * @description This method is used to create a new Axios instance with the provided
   * configuration. It is used to ensure that the client has a consistent configuration
   * across all requests and to provide sensible defaults for the client.
   * 
   * @private
   * 
   * @param configuration - Configuration for the Axios instance.
   * 
   * @returns Axios instance with the provided configuration.
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
   * @description This method is used to set the current authentication strategy for
   * the client. It is used to apply the strategy to all subsequent requests made by
   * the client. The strategy can be any object that implements the IAuthenticationStrategy
   * interface and provides an authenticate method.
   * 
   * @public
   * 
   * @param strategy - Authentication strategy to use for the client.
   */
  public setAuthenticationStrategy(strategy: IAuthenticationStrategy.IAuthenticationStrategy): void {
    this.authenticationStrategy = strategy;
  }

  /**
   * ## clearAuthenticationStrategy
   * 
   * Clears the current authentication strategy.
   * 
   * @description This method is used to clear the current authentication strategy for
   * the client. It is used to remove the strategy from the client and prevent it from
   * being applied to subsequent requests.
   * 
   * @public
   */
  public clearAuthenticationStrategy(): void {
    this.authenticationStrategy = undefined;
  }

  /**
   * ## setupInterceptors
   * 
   * Configures request and response interceptors for the Axios instance.
   * 
   * @description This method is used to configure request and response interceptors
   * for the Axios instance. It is used to apply the current authentication strategy
   * to all requests and to handle automatic retries for failed requests.
   * 
   * @private
   * 
   * @param retryConfiguration - Configuration for the retry interceptor.
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
   * @description This method is used to make an HTTP request to the server using the
   * current authentication strategy. It applies the strategy to the request configuration
   * and sends the request to the server. If the request fails, it will be retried according
   * to the retry configuration provided when the client was created.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param method - Request method to use.
   * @param url - Request URL.
   * @param data - Request data to send.
   * @param configuration - Request configuration.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async request<T>(
    method: string,
    url: string,
    data?: unknown,
    configuration: AxiosRequestConfig<any> = {}
  ): Promise<AxiosResponse<T, any>> {
    return this.axiosInstance.request<T>(
      {
        method,
        url,
        data,
        ...configuration
      }
    );
  }

  /**
   * ## get
   * 
   * Performs a GET request.
   * 
   * @description This method is used to perform a GET request to the server.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param url - Request URL.
   * @param configuration - Request configuration.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async get<T>(
    url: string, 
    configuration?: Partial<AxiosRequestConfig<any>>
  ): Promise<AxiosResponse<T, any>> {
    return this.request<T>('GET', url, undefined, configuration);
  }

  /**
   * ## post
   * 
   * Performs a POST request.
   * 
   * @description This method is used to perform a POST request to the server.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param url - Request URL.
   * @param configuration - Request configuration.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async post<T>(
    url: string, 
    data?: unknown, 
    configuration?: Partial<AxiosRequestConfig<any>>
  ): Promise<AxiosResponse<T, any>> {
    return this.request<T>('POST', url, data, configuration);
  }

  /**
   * ## put
   * 
   * Performs a PUT request.
   * 
   * @description This method is used to perform a PUT request to the server.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param url - Request URL.
   * @param configuration - Request configuration.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async put<T>(
    url: string, 
    data?: unknown, 
    configuration?: Partial<AxiosRequestConfig<any>>
  ): Promise<AxiosResponse<T, any>> {
    return this.request<T>('PUT', url, data, configuration);
  }

  /**
   * ## patch
   * 
   * Performs a PATCH request.
   * 
   * @description This method is used to perform a PATCH request to the server.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param url - Request URL.
   * @param configuration - Request configuration.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async patch<T>(
    url: string, 
    data?: unknown, 
    configuration?: Partial<AxiosRequestConfig<any>>
  ): Promise<AxiosResponse<T, any>> {
    return this.request<T>('PATCH', url, data, configuration);
  }

  /**
   * ## delete
   * 
   * Performs a DELETE request.
   * 
   * @description This method is used to perform a DELETE request to the server.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param url - Request URL.
   * @param configuration - Request configuration.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async delete<T>(
    url: string, 
    configuration?: Partial<AxiosRequestConfig<any>>
  ): Promise<AxiosResponse<T, any>> {
    return this.request<T>('DELETE', url, undefined, configuration);
  }

  /**
   * ## head
   * 
   * Performs a HEAD request.
   * 
   * @description This method is used to perform a HEAD request to the server.
   * 
   * @public
   * 
   * @async
   * 
   * @template T - Type of the expected response data.
   * 
   * @param url - Request URL.
   * @param configuration - Request configuration.
   * 
   * @returns Promise resolving to the typed response.
   * 
   * @throws If the request fails.
   */
  public async head<T>(
    url: string, 
    configuration?: Partial<AxiosRequestConfig<any>>
  ): Promise<AxiosResponse<T, any>> {
    return this.request<T>('HEAD', url, undefined, configuration);
  }
}
