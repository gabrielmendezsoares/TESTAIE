/**
 * ## IResponse
 * 
 * Standard response interface for all service responses.
 * 
 * @description Defines the contract that all service responses must follow throughout the application.
 * This generic interface ensures consistent response formatting across different services
 * while allowing for type-safe data payloads.
 * 
 * @template T - The type of the data payload in the response.
 */
export interface IResponse<T> {
  status: number;
  data: T;
}
