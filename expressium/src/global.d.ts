/**
 * ## NodeJS
 * 
 * NodeJS environment type declarations for application configuration.
 * 
 * @description Extends the global NodeJS namespace with additional type definitions
 * for environment variables and other custom properties. This helps provide
 * type safety and autocompletion when accessing process.env values throughout the application.
 * 
 * Type definitions in this namespace ensure that:
 * 
 * - Environment variables are properly documented
 * - IDE autocompletion works correctly when accessing process.env properties
 * - TypeScript compiler can perform type checking on environment variable usage
 * - Developers are aware of which environment variables are required by the application
 * 
 * These declarations should be kept in sync with the actual environment variables
 * used in the application and updated whenever new environment variables are added.
 */
declare namespace NodeJS { 
  /**
   * ## ProcessEnv
   * 
   * Type definitions for process.env environment variables.
   * 
   * @description Defines the structure of the process.env object by extending
   * the built-in ProcessEnv interface. This provides type checking for
   * environment variables used in the application.
   * 
   * The interface includes all environment variables required by the application,
   * their types, and detailed descriptions. This helps ensure that all necessary
   * environment variables are properly documented and used correctly throughout
   * the codebase.
   * 
   * Note that all environment variables are defined as `string | undefined` since
   * Node.js always provides environment variables as strings, and they may be
   * undefined if not set in the environment.
   */
  interface ProcessEnv { 
    /**
     * ## PORT
     * 
     * Server port configuration environment variable.
     * 
     * @description The port number on which the server will listen for incoming
     * connections. Must be converted to a number before using in server configuration.
     * 
     * Valid values should be numeric strings representing port numbers (typically
     * between 1024 and 65535 for non-root users).
     * 
     * When not provided, the application should fall back to a default port (e.g., 3000).
     */
    PORT: string | undefined;

    /**
     * ## DATABASE_URL
     * 
     * Database connection string environment variable.
     * 
     * @description Connection string for the database. This URL should contain all
     * necessary authentication credentials and connection parameters.
     * 
     * The format typically follows the standard database connection URL format:
     * `[driver]://[username]:[password]@[host]:[port]/[database][?parameters]`
     * 
     * Different database engines may have specific requirements for the connection string.
     * Common formats include:
     * 
     * - PostgreSQL: `postgresql://username:password@localhost:5432/dbname`
     * - MySQL: `mysql://username:password@localhost:3306/dbname`
     * - MongoDB: `mongodb://username:password@localhost:27017/dbname`
     */
    DATABASE_URL: string | undefined;

    /**
     * ## JWT_SECRET
     * 
     * JSON Web Token secret key environment variable.
     * 
     * @description Secret key used to sign and verify JSON Web Tokens. This key should
     * be kept secret and not shared publicly.
     * 
     * The secret should be a strong, random string with high entropy. For production
     * environments, it's recommended to use a cryptographically secure random generator
     * to create this value.
     * 
     * Requirements:
     * 
     * - Should be at least 32 characters long
     * - Should contain a mix of uppercase, lowercase, numbers, and special characters
     * - Should be unique per environment (development, staging, production)
     * - Should be rotated periodically according to security best practices
     */
    JWT_SECRET: string | undefined;

    /**
     * ## JWT_EXPIRES_IN
     * 
     * JSON Web Token expiration time environment variable.
     * 
     * @description Expiration time for JSON Web Tokens. This value should be a string
     * representing a time span or a number representing seconds.
     * 
     * Supported formats:
     * 
     * - A number expressed in seconds: `3600` (1 hour)
     * - A string describing a time span using the format: `1d` (1 day), `2h` (2 hours), etc.
     * 
     * Common time span units:
     * 
     * - `s`: seconds
     * - `m`: minutes
     * - `h`: hours
     * - `d`: days
     * - `w`: weeks
     * 
     * The expiration time should balance security (shorter times) with user experience
     * (longer times reduce the frequency of re-authentication).
     */
    JWT_EXPIRES_IN: string | undefined;
  } 
}
