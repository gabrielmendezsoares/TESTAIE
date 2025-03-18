import JWT from 'jsonwebtoken';

/**
 * ## IDecodedToken
 * 
 * Interface for JWT token payload after successful verification and decoding.
 * 
 * @description This interface extends the standard JWT payload structure with application-specific
 * claims required for the authentication and authorization system. It defines the expected
 * structure of decoded JWT tokens after verification, providing type safety when working
 * with token data throughout the authorization flow.
 * 
 * The interface includes the standard JWT claims from the jsonwebtoken library's JwtPayload
 * interface (such as iat, exp, sub) while adding custom claims specific to the application's
 * authentication requirements.
 * 
 * Custom claims include:
 * 
 * - User identity information
 * - Role-based access control data
 * - Token expiration metadata
 * 
 * This structure facilitates consistent token parsing and validation across different
 * parts of the application that handle authentication tokens.
 */
export interface IDecodedToken extends JWT.JwtPayload {
  username: string;
  roleList: string[];
  expiresIn: number;
}
