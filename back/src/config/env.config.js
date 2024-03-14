import { config } from "dotenv";

config();

export const configEnv = {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_CLUSTER: process.env.DB_CLUSTER,
  PORT: process.env.PORT,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
};
