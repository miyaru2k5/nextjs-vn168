import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums for status
export const userStatusEnum = pgEnum('user_status', ['active', 'inactive', 'locked']);
export const orderStatusEnum = pgEnum('order_status', ['completed', 'pending', 'cancelled', 'refunded']);
export const articleStatusEnum = pgEnum('article_status', ['published', 'draft', 'scheduled']);
export const bannerStatusEnum = pgEnum('banner_status', ['active', 'inactive', 'scheduled']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  avatar: text('avatar'),
  role: varchar('role', { length: 50 }).notNull().default('User'),
  status: userStatusEnum('status').notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  slug: varchar('slug', { length: 120 }).notNull().unique(),
  parent: varchar('parent', { length: 120 }),
  status: varchar('status', { length: 20 }).notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content'),
  categoryId: integer('category_id').references(() => categories.id),
  author: varchar('author', { length: 120 }).notNull(),
  status: articleStatusEnum('status').notNull().default('draft'),
  views: integer('views').notNull().default(0),
  likes: integer('likes').notNull().default(0),
  readTime: integer('read_time').notNull().default(5),
  featured: boolean('featured').notNull().default(false),
  coverImage: text('cover_image'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  articleId: integer('article_id').references(() => articles.id).notNull(),
  authorName: varchar('author_name', { length: 120 }).notNull(),
  authorAvatar: text('author_avatar'),
  content: text('content').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('pending'), // approved | pending | hidden | reported
  likes: integer('likes').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: varchar('order_number', { length: 50 }).notNull().unique(), // e.g. ORD-2847
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  packageName: varchar('package_name', { length: 50 }).notNull(), // Starter | Pro | Enterprise
  amount: integer('amount').notNull(), // in VND
  status: orderStatusEnum('status').notNull().default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const banners = pgTable('banners', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  position: varchar('position', { length: 120 }).notNull(),
  image: text('image').notNull(),
  status: bannerStatusEnum('status').notNull().default('active'),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const jobs = pgTable('jobs', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  excerpt: text('excerpt'),
  department: varchar('department', { length: 50 }).notNull(),
  location: varchar('location', { length: 120 }).notNull(),
  jobType: varchar('job_type', { length: 30 }).notNull(),
  level: varchar('level', { length: 30 }).notNull(),
  salaryMin: integer('salary_min'),
  salaryMax: integer('salary_max'),
  salaryCurrency: varchar('salary_currency', { length: 10 }).default('VND'),
  experience: varchar('experience', { length: 50 }),
  headcount: integer('headcount').default(1),
  publishedAt: timestamp('published_at'),
  deadline: timestamp('deadline'),
  views: integer('views').default(0),
  likes: integer('likes').default(0),
  featured: boolean('featured').default(false),
  companyLogo: text('company_logo'),
  coverImage: text('cover_image'),
  skills: text('skills'), // JSON string or comma separated for simplicity
  description: text('description'),
  responsibilities: text('responsibilities'), // store as JSON string
  requirements: text('requirements'),
  benefits: text('benefits'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Relations (for query includes)
export const articlesRelations = relations(articles, ({ one, many }) => ({
  category: one(categories, {
    fields: [articles.categoryId],
    references: [categories.id],
  }),
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  article: one(articles, {
    fields: [comments.articleId],
    references: [articles.id],
  }),
}));

export const usersRelations = relations(users, () => ({
  // extend later if you add orders to reference users
}));
