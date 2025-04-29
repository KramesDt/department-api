import * as dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  nodeEnv: string;
  JWT_SECRET?: string;
  JWT_EXPIRES_IN?: string;
  PRIVATE_KEY?: string;
  DB_HOST?: string;
  DB_PORT?: number;
  DB_USERNAME?: string;
  DB_PASSWORD?: string;
  DB_DATABASE?: string;
}

const config: Config = {
  PORT: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: Number(process.env.DB_PORT),
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
};

export default config;
