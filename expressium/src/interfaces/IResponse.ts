/**
 * ## IResponse
 * 
 * Generic wrapper interface for all service responses throughout the application.
 * 
 * @description This interface provides a standardized envelope structure for all service responses,
 * enabling consistent handling of diverse data payloads while maintaining a uniform outer structure.
 * It encapsulates both the HTTP status code and the typed response payload, allowing for:
 * 
 * - Type-safe data handling through generics
 * - Consistent error processing across different services
 * - Separation of HTTP transport concerns from business logic
 * - Unified response formatting for REST endpoints
 * 
 * Services return this wrapper rather than raw data objects, ensuring that HTTP metadata
 * is consistently included alongside the business data itself. This separation enables
 * middleware and controllers to handle status codes appropriately without needing to
 * inspect the internal structure of the response data.
 * 
 * @template T - The type of the data payload contained in the response. This allows for
 * type-safe handling of different response types while maintaining a consistent
 * outer structure.
 */
export interface IResponse<T> {
  status: number;
  data: T;
}
