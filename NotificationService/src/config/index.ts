// this file contains all the basic configuration logic for the app server to work

import dotenv from "dotenv";

type ServerConfig = {
  PORT: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_SERVER_URL: string;
  MAIL_USER: string;
  MAIL_PASS: string;
};

dotenv.config();

console.log("Environment variable loaded");

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3000,
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  REDIS_SERVER_URL: process.env.REDIS_SERVER_URL || "redis://localhost:6379",
  MAIL_USER: process.env.MAIL_USER || "",
  MAIL_PASS: process.env.MAIL_PASS || "",
};
