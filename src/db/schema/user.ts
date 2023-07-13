import { InferModel } from 'drizzle-orm';
import {
  serial, varchar, timestamp, mysqlTable, mysqlEnum,
} from 'drizzle-orm/mysql-core';
import db from '..';

export const RoleEnum = mysqlEnum('user', ['admin', 'user']);

export const table = mysqlTable('user', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }),
  avatar: varchar('avatar', { length: 255 }),
  email: varchar('email', { length: 120 }),
  role: RoleEnum.notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type User = InferModel<typeof table>
export type NewUser = InferModel<typeof table, 'insert'>
