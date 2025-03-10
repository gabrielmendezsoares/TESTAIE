/**
 * @describe Extends the global NodeJS module with custom properties.
 * 
 * @description Adds custom properties to the NodeJS module to provide type guards.
 */
declare namespace NodeJS { 
  /**
   * @interface ProcessEnv
   * 
   * @describe Interface for the process environment.
   * 
   * @description Defines the contract that all process environment objects must follow.
   */
  interface ProcessEnv { PORT: string | undefined; } 
}
