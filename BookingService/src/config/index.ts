// this file contains all the basic configuration logic for the app server to work

import dotenv from "dotenv";

type ServerConfig = {
  PORT: number;
  REDIS_SERVER_URL: string;
};

dotenv.config();

console.log("Environment variable loaded");

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3000,
  REDIS_SERVER_URL: process.env.REDIS_SERVER_URL || "redis://localhost:6379",
};
