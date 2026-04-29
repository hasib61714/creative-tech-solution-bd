import { sql } from 'drizzle-orm';
import { mysqlTable, int, varchar, text, datetime, boolean } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  role: varchar('role', { length: 32 }).notNull().default('user'),
  createdAt: datetime('created_at').notNull().default(sql`now()`),
  updatedAt: datetime('updated_at').notNull().default(sql`now()`),
});

export const bookings = mysqlTable('bookings', {
  id: int('id').primaryKey().autoincrement(),
  service: varchar('service', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  date: varchar('date', { length: 50 }),
  time: varchar('time', { length: 50 }),
  details: text('details'),
  status: varchar('status', { length: 32 }).notNull().default('pending'),
  createdAt: datetime('created_at').notNull().default(sql`now()`),
});

export const servicesTable = mysqlTable('services', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  features: text('features'),
  fromPrice: varchar('from_price', { length: 50 }),
  tag: varchar('tag', { length: 50 }),
  active: boolean('active').notNull().default(true),
  createdAt: datetime('created_at').notNull().default(sql`now()`),
});

export const portfolioItems = mysqlTable('portfolio_items', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }),
  metric: varchar('metric', { length: 255 }),
  tag: varchar('tag', { length: 255 }),
  description: text('description'),
  createdAt: datetime('created_at').notNull().default(sql`now()`),
});

export const testimonials = mysqlTable('testimonials', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  message: text('message').notNull(),
  rating: int('rating').default(5),
  status: varchar('status', { length: 32 }).notNull().default('pending'),
  createdAt: datetime('created_at').notNull().default(sql`now()`),
});

export const contactMessages = mysqlTable('contact_messages', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }),
  message: text('message').notNull(),
  read: boolean('read').notNull().default(false),
  createdAt: datetime('created_at').notNull().default(sql`now()`),
});

export const siteSettings = mysqlTable('site_settings', {
  key: varchar('key', { length: 100 }).primaryKey(),
  value: text('value'),
});
