import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';

export * as post from './schema/post';

const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export default drizzle(connection);
