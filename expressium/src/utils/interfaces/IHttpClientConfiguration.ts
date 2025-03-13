import { AxiosRequestConfig } from 'axios/index';

/**
 * ## IHttpClientConfiguration
 * 
 * Configuration settings for an HTTP client.
 * 
 * @description This interface defines the configuration settings that can be used
 * to customize the behavior of an HTTP client. These settings can be used to control
 * how the client communicates with the server, including the default headers to
 * include with every request, the request timeout, and the retry settings for
 * requests that fail. This interface extends the AxiosRequestConfig interface
 * provided by the Axios library, which allows the client to pass additional
 * configuration settings to the Axios library when making requests.
 */
export interface IHttpClientConfiguration extends AxiosRequestConfig<any> {
  /**
   * ## retry
   * 
   * Retry settings for requests that fail.
   * 
   * @description This object contains settings that control how the client should
   * handle requests that fail. If the response status code matches any of the
   * values in the statusCodes array, the client will make up to maxAttempts
   * attempts to retry the request, waiting baseDelay milliseconds between each
   * attempt. This feature can be used to improve the reliability of the client
   * when communicating with unreliable servers.
   */
  retry?: {
    /**
     * ## statusCodes
     * 
     * HTTP status codes that should trigger a retry.
     * 
     * @description If the response status code matches any of the values in this
     * array, the client will attempt to retry the request. This feature can be
     * used to handle transient errors that may occur when communicating with the
     * server. For example, a status code of 500 may indicate that the server is
     * overloaded and the request should be retried after a short delay.
     */
    statusCodes: number[];

    /**
     * ## maxAttempts
     * 
     * Maximum number of retry attempts.
     * 
     * @description The client will make up to this many attempts to retry the request
     * if it fails. If the server does not respond successfully after this many
     * attempts, the client will return an error. This value should be set according
     * to the expected reliability of the server.
     */
    maxAttempts: number;

    /**
     * ## baseDelay
     * 
     * Initial delay before the first retry attempt.
     * 
     * @description The client will wait this long before making the first retry
     * attempt. Subsequent attempts will wait longer, following an exponential
     * backoff strategy. This value should be set according to the expected response
     * time of the server.
     */
    baseDelay: number;
  };

  /**
   * ## headers
   * 
   * Default headers to include with every request.
   * 
   * @description This object contains key-value pairs that represent the default
   * headers to include with every request. These headers will be merged with any
   * headers specified in the request configuration, with the request headers taking
   * precedence. This feature can be used to set common headers that are required
   * for every request, such as authentication tokens or user agents.
   */
  headers?: Record<string, string>;

  /**
   * ## timeout
   * 
   * Request timeout in milliseconds.
   * 
   * @description The client will wait this long for the server to respond to the
   * request before timing out and returning an error. This feature can be used to
   * prevent the client from waiting indefinitely for a response that may never
   * arrive. The default value is 0, which means that the client will wait indefinitely.
   */
  timeout?: number;
}
