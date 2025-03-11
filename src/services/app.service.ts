import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import JWT, { Secret } from 'jsonwebtoken';
import { StringValue } from 'ms';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { IApiToken, IReqBody, IUser } from '../interfaces';
import { cryptographyUtil } from '../utils';

const prisma = new PrismaClient();

/**
 * ## getUser
 * 
 * Retrieves a user from the database based on application type and username.
 * 
 * @description This function performs a database lookup for a user with the specified application type
 * and username combination. It uses a composite unique key for the lookup.
 * 
 * @async
 * 
 * @param applicationType - The type of application the user belongs to.
 * @param username - The unique username within the specified application type.
 * 
 * @returns A Promise that resolves to the user object if found, or undefined if no matching user exists.
 */
const getUser = async (
  applicationType: string, 
  username: string
): Promise<IUser.IUser | undefined> => {
  return await prisma.users.findUnique(
    {
      where: {
        application_type_username: {
          application_type: applicationType,
          username
        }
      }
    }
  ) || undefined;
};

/**
 * ## getApiToken
 * 
 * Retrieves API token configuration for the specified application type.
 * 
 * @description This function fetches the API token settings associated with a particular application type,
 * which includes the secret key and expiration settings needed for JWT operations.
 * 
 * @async
 * 
 * @param applicationType - The type of application to retrieve token settings for.
 * 
 * @returns A Promise that resolves to the API token configuration if found, or undefined if no configuration exists.
 */
const getApiToken = async ( applicationType: string): Promise<IApiToken.IApiToken | undefined> => {
  return await prisma.api_tokens.findUnique({ where: { api_type: applicationType } }) || undefined;
};

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
): Promise<any> => {
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

  const { 
    jwtSecretEncryptionKey,
    jwtSecretIvString
  } = req.body as IReqBody.IReqBody;

  if (!jwtSecretEncryptionKey) {
    return { 
      status: 400, 
      data: { 
        status: false,
        statusCode: 400,
        timestamp,
        message: 'JWT secret encryption key is required.',
        suggestion: 'Include the JWT secret encryption key in your request body.'
      }
    };
  }

  if (!jwtSecretIvString) {
    return { 
      status: 400, 
      data: { 
        status: false,
        statusCode: 400,
        timestamp,
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

    const user = await getUser(applicationType, username);

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

    const apiToken = await getApiToken(applicationType);

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
      jwtSecretEncryptionKey,
      jwtSecretIvString,
      apiToken.secret
    ) as Secret;
  
    return {
      status: 200,
      data: {
        username,
        roleList: user.role_list,
        expiresIn,
        token: JWT.sign(
          {
            username,
            roleList: user.role_list,
            expiresIn
          },
          decryptedSecret,
          { expiresIn: apiToken.expiration as StringValue }
        )
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

/**
 * ## getAuthorization
 * 
 * Authorizes requests using JWT token verification
 * 
 * @description This middleware function validates JWT tokens provided in the Authorization
 * header for subsequent API requests after initial authentication. It verifies
 * the token signature, expiration, and attaches the decoded user information
 * to the request object for downstream middleware and route handlers.
 * 
 * The function handles:
 * - JWT token presence verification
 * - Request body validation for required fields
 * - Token signature verification using the decrypted secret
 * - Token expiration checking
 * - Different JWT error types with appropriate responses
 * 
 * @param req - Express Request object containing auth header and body.
 * @param _res - Express Response object (unused but passed to next middleware).
 * @param next - Express NextFunction for continuing the middleware chain.
 * @param timestamp - Current timestamp string for logging and response generation.
 * 
 * @returns Promise resolving to void (continues middleware chain) or error response.
 */
export const getAuthorization = async (
  req: Request,
  _res: Response,
  next: NextFunction,
  timestamp: string
): Promise<any> => {
  const reqHeadersAuthorization = req.headers.authorization;

  if (!reqHeadersAuthorization) {
    return { 
      status: 401, 
      data: { 
        status: false,
        statusCode: 401,
        timestamp,
        path: req.originalUrl || req.url,
        method: req.method,
        message: 'Authentication token is missing.',
        suggestion: 'Include a token in the Authorization header.'
      }
    };
  }

  const { 
    jwtSecretEncryptionKey,
    jwtSecretIvString
  } = req.body as IReqBody.IReqBody;

  if (!jwtSecretEncryptionKey) {
    return { 
      status: 400, 
      data: { 
        status: false,
        statusCode: 400,
        timestamp,
        message: 'JWT secret encryption key is required.',
        suggestion: 'Include the JWT secret encryption key in your request body.'
      }
    };
  }

  if (!jwtSecretIvString) {
    return { 
      status: 400, 
      data: { 
        status: false,
        statusCode: 400,
        timestamp,
        message: 'JWT secret IV string is required.',
        suggestion: 'Include the JWT secret IV string in your request body.'
      }
    };
  }

  const applicationType = path.basename(process.cwd());

  try {
    const apiToken = await getApiToken(applicationType);

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

    const decryptedSecret = cryptographyUtil.decryptFromAes256Cbc(
      jwtSecretEncryptionKey,
      jwtSecretIvString,
      apiToken.secret
    ) as Secret;

    try {
      const decodedToken = JWT.verify(reqHeadersAuthorization, decryptedSecret);

      if (
        Object.isObject(decodedToken) && 
        'expiresIn' in decodedToken &&
        Date.now() > (decodedToken.expiresIn as number)
      ) {
        return {
          status: 401, 
          data: {
            status: false,
            statusCode: 401,
            timestamp,
            path: req.originalUrl || req.url,
            method: req.method,
            message: 'Your session has expired.',
            suggestion: 'Please log in again to obtain a new token.' 
          }
        };
      }

      (req as any).user = decodedToken;

      next();

      return;
    } catch(error: unknown) {
      if (error instanceof JWT.JsonWebTokenError) {
        console.log(`Service | Timestamp: ${ timestamp } | Method: getAuthorization | Error: ${ error instanceof Error ? error.message : String(error) }`);

        return {
          status: 401,
          data: {
            status: false,
            statusCode: 401,
            timestamp,
            path: req.originalUrl || req.url,
            method: req.method,
            message: 'Invalid authentication token.',
            suggestion: 'Please ensure you are using a valid, unmodified token.' 
          }
        };
      } else if (error instanceof JWT.NotBeforeError) {
        console.log(`Service | Timestamp: ${ timestamp } | Method: getAuthorization | Error: ${ error instanceof Error ? error.message : String(error) }`);

        return {
          status: 401,
          data: {
            status: false,
            statusCode: 401,
            timestamp,
            path: req.originalUrl || req.url,
            method: req.method,
            message: 'Token not yet active.',
            suggestion: 'This token cannot be used until its activation time.' 
          }
        };
      } else if (error instanceof JWT.TokenExpiredError) {
        console.log(`Service | Timestamp: ${ timestamp } | Method: getAuthorization | Error: ${ error instanceof Error ? error.message : String(error) }`);

        return {
          status: 401,
          data: {
            status: false,
            statusCode: 401,
            timestamp,
            path: req.originalUrl || req.url,
            method: req.method,
            message: 'Your authentication token has expired.',
            suggestion: 'Please log in again to continue using the API.' 
          }
        };
      }
      
      throw error;
    }
  } catch (error: unknown) {
    console.log(`Service | Timestamp: ${ timestamp } | Method: getAuthorization | Error: ${ error instanceof Error ? error.message : String(error) }`);

    return {
      status: 500,
      data: {
        status: false,
        statusCode: 500,
        timestamp,
        path: req.originalUrl || req.url,
        method: req.method,
        message: 'Authorization process encountered a technical issue.',
        suggestion: 'Our team has been notified. Please try again in a few minutes.' 
      }
    };
  }
};
