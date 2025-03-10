export interface IApiToken {
  id: number;
  api_type: string;
  secret: string;
  expiration: string;
  created_at: Date;
  updated_at: Date;
}
