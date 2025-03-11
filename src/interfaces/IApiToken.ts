/**
 * ## IApiToken
 * 
 * Interface for API token objects.
 * 
 * @description Defines the contract that all API token objects must follow.
 */
export interface IApiToken {
  id: number;
  api_type: string;
  secret: string;
  expiration: string;
  created_at: Date;
  updated_at: Date;
}
