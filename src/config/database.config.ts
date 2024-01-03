import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  connection: process.env.MONGO_CONNECTION,
  dbName: process.env.MONGO_DB,
  host: process.env.MONGO_HOST,
  pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
  port: parseInt(process.env.MONGO_PORT, 10),
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
}));
