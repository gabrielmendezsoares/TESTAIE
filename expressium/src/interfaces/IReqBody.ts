/**
 * ## IReqBody
 * 
 * Interface for request body objects.
 * 
 * @description Defines the contract that all request body objects must follow.
 */
export interface IReqBody { 
  jwtSecretEncryptionKey?: string;
  jwtSecretIvString?: string;
}
