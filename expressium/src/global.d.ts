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
  } 
}
