import { Request, Response, NextFunction } from 'express';
import JWT, { Secret } from 'jsonwebtoken';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { IReqBody } from '../interfaces';
import { cryptographyUtil } from '../utils';

const prisma = new PrismaClient();

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
) => {
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
