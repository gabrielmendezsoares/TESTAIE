/**
 * ## NodeJS
 * 
 * NodeJS environment type declarations for application configuration.
 * 
 * @description Extends the global NodeJS namespace with additional type definitions
 * for environment variables and other custom properties. This helps provide
 * type safety and autocompletion when accessing process.env values.
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
   */
  interface ProcessEnv { 
    /**
     * ## PORT
     * 
     * Server port configuration environment variable.
     * 
     * @description The port number on which the server will listen for incoming
     * connections. Must be converted to a number before using in server configuration.
     */
    PORT: string | undefined;

    /**
     * ## DATABASE_URL
     * 
     * Database connection string environment variable.
     * 
     * @description Connection string for the database. This URL should contain all
     * necessary authentication credentials and connection parameters.
     */
    DATABASE_URL: string | undefined;

    /**
     * ## JWT_SECRET
     * 
     * JSON Web Token secret key environment variable.
     * 
     * @description Secret key used to sign and verify JSON Web Tokens. This key should
     * be kept secret and not shared publicly.
     */
    JWT_SECRET: string | undefined;

    /**
     * ## JWT_EXPIRES_IN
     * 
     * JSON Web Token expiration time environment variable.
     * 
     * @description Expiration time for JSON Web Tokens. This value should be a string
     * representing a time span or a number representing seconds.
     */
    JWT_EXPIRES_IN: string | undefined;
  } 
}
