/**
 * Seed Data Central Module (src/lib/seed/)
 * 
 * This is the primary specific main file for all seed, mock, and test data handling.
 * All logic is concentrated here.
 * 
 * Consumers should import from here:
 *   import { getUsers, getResolvedDataSource } from '@/lib/seed'
 */

export * from './config';
export * from './generators';
export * from './loader';
export * from './mock-data';
