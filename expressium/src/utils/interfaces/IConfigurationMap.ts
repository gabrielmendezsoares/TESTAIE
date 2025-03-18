import { AxiosRequestConfig } from 'axios/index';

/**
 * ## IConfigurationMap
 * 
 * Configuration settings for an HTTP client.
 * 
 * @description This interface defines the configuration settings that can be used
 * to customize the behavior of an HTTP client. These settings can be used to control
 * how the client communicates with the server, including the default headers to
 * include with every request, the request timeout, and the retry settings for
 * requests that fail.
 * 
 * This interface extends the AxiosRequestConfig interface provided by the Axios library,
 * which allows it to inherit all standard Axios configuration properties such as
 * baseURL, responseType, auth, etc. This provides a comprehensive set of configuration
 * options for HTTP requests while adding custom properties specific to the application's
 * needs, particularly retry behavior.
 */
export interface IConfigurationMap extends AxiosRequestConfig<any> {
  /**
   * ## retry
   * 
   * Retry settings for requests that fail.
   * 
   * @description This object contains settings that control how the client should
   * handle requests that fail. If the response status code matches any of the
   * values in the statusCodes array, the client will make up to maxAttempts
   * attempts to retry the request, waiting baseDelay milliseconds between each
   * attempt.
   * 
   * The retry mechanism uses exponential backoff, meaning that the delay increases
   * with each subsequent retry attempt. This helps to prevent overwhelming the server
   * with rapid retry attempts when it's experiencing issues.
   * 
   * This feature can be used to improve the reliability of the client when communicating
   * with unreliable servers or when handling transient network issues.
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
     * server.
     * 
     * Common status codes to include:
     * 
     * - 408 (Request Timeout)
     * - 429 (Too Many Requests)
     * - 500 (Internal Server Error)
     * - 502 (Bad Gateway)
     * - 503 (Service Unavailable)
     * - 504 (Gateway Timeout)
     * 
     * Client errors (4xx) other than those listed above generally should not be
     * retried as they usually indicate a problem with the request itself rather
     * than a transient server issue.
     */
    statusCodes: number[];

    /**
     * ## maxAttempts
     * 
     * Maximum number of retry attempts.
     * 
     * @description The client will make up to this many attempts to retry the request
     * if it fails. If the server does not respond successfully after this many
     * attempts, the client will return an error.
     * 
     * This value should be set according to the expected reliability of the server
     * and the criticality of the request. Higher values improve reliability but
     * can increase latency for failing requests.
     * 
     * A typical value might be 3-5 attempts, balancing reliability with reasonable
     * timeout behavior.
     * 
     * Note: This value represents the maximum number of retry attempts, not the total
     * number of attempts. The total number of attempts will be maxAttempts + 1,
     * counting the initial request.
     */
    maxAttempts: number;

    /**
     * ## baseDelay
     * 
     * Initial delay before the first retry attempt, in milliseconds.
     * 
     * @description The client will wait this long before making the first retry
     * attempt. Subsequent attempts will wait longer, following an exponential
     * backoff strategy (typically 2^n * baseDelay, where n is the retry attempt number).
     * 
     * This value should be set according to the expected response time of the server
     * and the nature of the transient issues being addressed. For example:
     * 
     * - For quick-recovering services, a shorter delay (e.g., 200-500ms) might be appropriate
     * - For overloaded services, a longer delay (e.g., 1000-2000ms) might give the server more time to recover
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
   * headers specified in the request configuration, with the request-specific headers
   * taking precedence.
   * 
   * This feature can be used to set common headers that are required for every request,
   * such as authentication tokens, API keys, content types, or user agents.
   * 
   * Common headers include:
   * 
   * - 'Content-Type': Specifies the media type of the request body
   * - 'Authorization': Contains authentication credentials
   * - 'Accept': Specifies the media types acceptable for the response
   * - 'User-Agent': Identifies the client application
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
   * arrive.
   * 
   * The appropriate timeout value depends on several factors:
   * 
   * - The expected response time of the server under normal conditions
   * - The criticality of the request (critical requests might warrant longer timeouts)
   * - Network conditions between client and server
   * - The nature of the operation being performed (e.g., file uploads might need longer timeouts)
   * 
   * The default value is 0, which means that the client will wait indefinitely for a response.
   * It's generally recommended to set a reasonable timeout value to prevent resource leaks
   * and improve user experience.
   * 
   * Note: This timeout applies to the entire request lifecycle, including connection 
   * establishment, request transmission, server processing, and response transmission.
   */
  timeout?: number;
}
