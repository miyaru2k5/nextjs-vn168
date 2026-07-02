/**
 * Seed Data Central Module (src/lib/seed/)
 *
 * This module concentrates the logic for generating and loading **sample/test data only**.
 * It is an auxiliary utility for development and testing functionality.
 *
 * IMPORTANT:
 * - Seed depends on existing types from @/lib/admin/types (and blog/careers types).
 * - **Do not create types here**. Production code should NOT depend on this module for core data.
 * - Role is strictly limited to seeding sample data for testing.
 *
 * Consumers (for seeding purposes) should import from here:
 *   import { getUsers, getResolvedDataSource, ensureDevSeed } from '@/lib/seed'
 */

export * from './generators';
export * from './mock-data';
export * from './ensure';
