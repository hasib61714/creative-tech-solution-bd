import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 10,
});

export const db = drizzle(pool);
