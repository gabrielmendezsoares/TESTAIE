/**
 * ## IReqBody
 * 
 * Standard structure for HTTP request body containing JWT configuration.
 * 
 * @description Defines the contract that all request body objects must follow when dealing with
 * JWT authentication. This interface specifies optional encryption-related properties
 * that may be included in request bodies for secure operations.
 */
export interface IReqBody { 
  jwtSecretEncryptionKey?: string;
  jwtSecretIvString?: string;
}
