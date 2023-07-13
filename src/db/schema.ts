import {
  boolean, serial, int, varchar, text, timestamp, mysqlTable,
} from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }),
  email: varchar('email', { length: 120 }),
  role: text('role').$type<'admin' | 'user'>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// export const tag = mysqlTable('tag', {
//   id: serial('id').primaryKey(),
//   name: varchar('name', { length: 120 }),
// });

export const post = mysqlTable('post', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }),
  authorId: int('author_id').references(() => user.id),
  excerpt: text('excerpt'),
  content: text('content'),
  likes: int('likes').default(0),
  cover: varchar('cover', { length: 255 }),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
