import { Request } from 'express';
import bcrypt from 'bcryptjs';
import JWT, { Secret } from 'jsonwebtoken';
import { StringValue } from 'ms';
import { PrismaClient } from '@prisma/client';
import { IApiToken, IReqBody, IUser } from '../interfaces';
import { cryptographyUtil } from '../utils';

const {
  JWT_SECRET_ENCRYPTION_KEY,
  JWT_SECRET_IV_STRING
} = process.env;

const prisma = new PrismaClient();

const getUser = async (
  applicationType: string, 
  username: string
): Promise<IUser.IUser | undefined> => 
  (
    await prisma.users.findUnique(
      {
        where: {
          application_type_username: {
            application_type: applicationType,
            username
          }
        }
      }
    )
  ) || undefined;

const getApiToken = async ( applicationType: string): Promise<IApiToken.IApiToken | undefined> => 
  (await prisma.api_tokens.findUnique({ where: { api_type: applicationType } })) || undefined;

export const getAuthentication = async (
  req: Request, 
  timestamp: string
) => {
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

  const { applicationType } = req.body as IReqBody.IReqBody;

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
      }
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

    const decryptedSecret = cryptographyUtil.decryptFromAes256CbcUtil(
      JWT_SECRET_ENCRYPTION_KEY as string,
      JWT_SECRET_IV_STRING as string,
      apiToken.secret
    ) as Secret;
  
    return {
      status: 200,
      data: {
        token: JWT.sign(
          {
            username,
            roleList: user.role_list
          },
          decryptedSecret,
          { expiresIn: apiToken.expiration as StringValue }
        ),
        expiresIn
      }
    };
  } catch (error: unknown) {
    console.log(`Service | getAuthentication | ${ timestamp } | ${ error instanceof Error ? error.message : String(error) }`);

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
  }
};

export const getAuthorization = async () => {};
