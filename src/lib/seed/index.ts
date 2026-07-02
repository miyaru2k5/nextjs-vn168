/**
 * Seed Data Central Module (src/lib/seed/)
 * 
 * This is the primary specific main file for all seed, mock, and test data handling.
 * All logic is concentrated here.
 * 
 * Consumers should import from here:
 *   import { getResolvedDataSource } from '@/lib/seed'
 * Server data loaders: '@/lib/seed/loader'
 * Client data loaders: '@/lib/seed/loader-client'
 */

export * from './config';
export * from './generators';
export * from './mock-data';
