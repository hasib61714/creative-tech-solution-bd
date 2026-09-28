import { drizzle } from 'drizzle-orm/mysql2';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

/**
 * The connection is created lazily on first query rather than at import time.
 *
 * Importing this module used to throw when DATABASE_URL was unset, which made
 * `next build` fail on any machine without database credentials — including
 * every CI and first deploy. Deferring the connection lets the site build and
 * render, and callers that already guard their queries (see `getSiteContent`,
 * the portfolio and services loaders) fall back to static content instead.
 */
let instance: MySql2Database | null = null;

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function getDb(): MySql2Database {
  if (instance) return instance;
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  const pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    connectionLimit: 10,
  });
  instance = drizzle(pool);
  return instance;
}

export const db = new Proxy({} as MySql2Database, {
  get(_target, property, receiver) {
    return Reflect.get(getDb(), property, receiver);
  },
});
