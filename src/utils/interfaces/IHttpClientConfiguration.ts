import { AxiosRequestConfig } from 'axios/index';

/**
 * @interface IHttpClientConfiguration
 * 
 * @describe Interface for configuration options for the HTTP client.
 * 
 * @description Defines the contract that all HTTP client configurations must follow.
 */
export interface IHttpClientConfiguration extends AxiosRequestConfig<any> {
  /**
   * @describe Optional configuration for retrying requests.
   * 
   * @description This object contains the settings for retrying requests that fail due to
   * network errors or server issues. It specifies the HTTP status codes that
   * should trigger a retry, the maximum number of retry attempts, and the base
   * delay between retries in milliseconds.
   */
  retry?: {
    /**
     * @describe HTTP status codes that should trigger a retry.
     * 
     * @description If the response from the server contains one of these status codes,
     * the request will be retried according to the retry configuration.
     */
    statusCodes: number[];

    /**
     * @describe Maximum number of retry attempts.
     * 
     * @description If the request fails and the response status code is in the statusCodes
     * array, the request will be retried up to this number of times.
     */
    maxAttempts: number;

    /**
     * @describe Base delay between retries in milliseconds.
     * 
     * @description The initial delay between retries will be this value, and it will be
     * multiplied by the attempt number for each subsequent retry.
     */
    baseDelay: number;
  };

  /**
   * @describe Optional default headers to include with all requests.
   * 
   * @description This object contains key-value pairs representing the headers
   * that should be included with every request made using this configuration.
   */
  headers?: Record<string, string>;

  /**
   * @describe Optional request timeout in milliseconds.
   * 
   * @description If the server does not respond within this time frame, the request will
   * be considered failed and an error will be thrown. This value should be
   * set according to the expected response time of the server.
   */
  timeout?: number;
}
