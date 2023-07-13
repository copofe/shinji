import {
  boolean, serial, int, varchar, text, timestamp, mysqlTable,
} from 'drizzle-orm/mysql-core';

export const table = mysqlTable('post', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }),
  authorId: int('author_id'),
  excerpt: text('excerpt'),
  content: text('content'),
  likes: int('likes').default(0),
  cover: varchar('cover', { length: 255 }),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
