// this file contains all the basic configuration logic for the app server to work

import dotenv from "dotenv";

dotenv.config();

type ServerConfig = {
  PORT: number;
};

console.log("Environment variable loaded");
export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT),
};

export const dbConfig = {
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USERNAME: process.env.DB_USERNAME,
};

