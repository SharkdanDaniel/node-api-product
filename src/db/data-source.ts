import 'dotenv/config';
import { DataSource } from 'typeorm';
const path = require('path');
export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [path.join(__dirname, '../entities/*.{ts,js}')],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
} as any)