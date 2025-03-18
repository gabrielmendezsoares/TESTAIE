import { JsonValue } from "@prisma/client/runtime/library";

export interface IResponseData {
  status: boolean;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string;
  suggestion: string;
}

export interface IAuthenticationResponseData {
  status: boolean;
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  data: {
    username: string;
    roleList: JsonValue;
    token: string;
    expiresIn: number;
  };
}
