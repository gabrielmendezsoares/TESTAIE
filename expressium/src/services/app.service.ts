import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import JWT, { Secret } from 'jsonwebtoken';
import { StringValue } from 'ms';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { IResponse, IResponseData } from '../interfaces';
import { cryptographyUtil } from '../utils';

const { 
  JWT_SECRET_ENCRYPTION_KEY,
  JWT_SECRET_IV_STRING
} = process.env;

const prisma = new PrismaClient();

/**
 * ## getAuthentication
 * 
 * Authenticates a user using Basic Authentication credentials
 * 
 * @description This function performs the initial authentication process using Basic Authentication
 * credentials provided in the request header. It validates the credentials against
 * stored user data and generates a JWT token for subsequent authorized requests.
 * 
 * The function handles:
 * - Basic Auth header validation
 * - Request body validation for required fields
 * - User existence and status verification
 * - Password verification using bcrypt
 * - JWT token generation with appropriate expiration
 * 
 * @param req - Express Request object containing auth headers and body.
 * @param _res - Express Response object (unused but required for middleware signature).
 * @param _next - Express NextFunction (unused but required for middleware signature).
 * @param timestamp - Current timestamp string for logging and response generation.
 * 
 * @returns Promise resolving to either a success response with token or an error response.
 */
export const getAuthentication = async (
  req: Request,
  _res: Response,
  _next: NextFunction,
  timestamp: string
): Promise<IResponse.IResponse<IResponseData.IResponseData | IResponseData.IAuthenticationResponseData>> => {
  const reqHeadersAuthorization = req.headers.authorization;
  
  if (!reqHeadersAuthorization) {
    return { 
      status: 400, 
      data: { 
        status: false,
        statusCode: 400,
        timestamp,
        path: req.originalUrl || req.url,
        method: req.method,
        message: 'Authorization header required for secure access.',
        suggestion: 'Add the Authorization header with format: "Basic base64(username:password)".' 
      }
    };
  }
  
  if (!reqHeadersAuthorization.startsWith('Basic ')) {
    return { 
      status: 400, 
      data: { 
        status: false,
        statusCode: 400,
        timestamp,
        path: req.originalUrl || req.url,
        method: req.method,
        message: 'Authorization must use Basic authentication scheme.',
        suggestion: 'Format should be: "Basic" followed by base64 encoded "username:password".' 
      }
    };
  }

  if (!JWT_SECRET_ENCRYPTION_KEY) {
    return { 
      status: 400, 
      data: { 
        status: false,
        statusCode: 400,
        timestamp,
        path: req.originalUrl || req.url,
        method: req.method,
        message: 'JWT secret encryption key is required.',
        suggestion: 'Include the JWT secret encryption key in your request body.'
      }
    };
  }

  if (!JWT_SECRET_IV_STRING) {
    return { 
      status: 400, 
      data: { 
        status: false,
        statusCode: 400,
        timestamp,
        path: req.originalUrl || req.url,
        method: req.method,
        message: 'JWT secret IV string is required.',
        suggestion: 'Include the JWT secret IV string in your request body.'
      }
    };
  }

  const applicationType = path.basename(process.cwd());

  try {
    const [
      username, 
      password
    ] = Buffer
      .from(reqHeadersAuthorization.split(' ')[1], 'base64')
      .toString('ascii')
      .split(':');

    const user = await prisma.users.findUnique(
      {
        where: {
          application_type_username: {
            application_type: applicationType,
            username
          }
        }
      }
    ) || undefined;

    if (!user) {
      return {
        status: 401,
        data: {
          status: false,
          statusCode: 401,
          timestamp,
          path: req.originalUrl || req.url,
          method: req.method,
          message: 'User not found in our system.',
          suggestion: 'Verify your username or register a new account if needed.' 
        }
      };
    }

    if (!user?.is_user_active) {
      return { 
        status: 403, 
        data: {
          status: false,
          statusCode: 403,
          timestamp,
          path: req.originalUrl || req.url,
          method: req.method,
          message: 'This account has been deactivated.',
          suggestion: 'Contact your administrator to reactivate this account.' 
        }
      };
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return { 
        status: 401, 
        data: {
          status: false,
          statusCode: 401,
          timestamp,
          path: req.originalUrl || req.url,
          method: req.method,
          message: 'Password verification failed.',
          suggestion: 'Check your password and try again. Reset your password if needed.' 
        }
      };
    }

    const apiToken = await prisma.api_tokens.findUnique({ where: { api_type: applicationType } }) || undefined;

    if (!apiToken) {
      return { 
        status: 500, 
        data: {
          status: false,
          statusCode: 500,
          timestamp,
          path: req.originalUrl || req.url,
          method: req.method,
          message: 'API configuration not found.',
          suggestion: 'The requested API type is not properly configured in the system.' 
        }
      };
    }

    let expiresIn: number;

    if (typeof apiToken.expiration === 'string') {
      const unit = apiToken.expiration.slice(-1);
      const value = parseInt(apiToken.expiration.slice(0, -1), 10);
      
      switch (unit) {
        case 's': expiresIn = Date.now() + (value * 1000); break;
        case 'm': expiresIn = Date.now() + (value * 60 * 1000); break;
        case 'h': expiresIn = Date.now() + (value * 60 * 60 * 1000); break;
        case 'd': expiresIn = Date.now() + (value * 24 * 60 * 60 * 1000); break;
        default: expiresIn = Date.now() + (3600 * 1000);
      }
    } else {
      expiresIn = Date.now() + (3600 * 1000);
    }

    const decryptedSecret = cryptographyUtil.decryptFromAes256Cbc(
      JWT_SECRET_ENCRYPTION_KEY,
      JWT_SECRET_IV_STRING,
      apiToken.secret
    ) as Secret;
  
    return {
      status: 200,
      data: {
        username,
        roleList: user.role_list,
        token: JWT.sign(
          {
            username,
            roleList: user.role_list,
            expiresIn
          },
          decryptedSecret,
          { expiresIn: apiToken.expiration as StringValue }
        ),
        expiresIn
      }
    };
  } catch (error: unknown) {
    console.log(`Service | Timestamp: ${ timestamp } | Name: getAuthentication | Error: ${ error instanceof Error ? error.message : String(error) }`);

    return {
      status: 500,
      data: {
        status: false,
        statusCode: 500,
        timestamp,
        path: req.originalUrl || req.url,
        method: req.method,
        message: 'Authentication process encountered a technical issue.',
        suggestion: 'Our team has been notified. Please try again in a few minutes.' 
      }
    }
  };
};
