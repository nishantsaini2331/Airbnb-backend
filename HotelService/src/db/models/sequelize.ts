import { Sequelize } from "sequelize";
import { dbConfig } from "../../config";

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: dbConfig.DB_HOST,
  username: dbConfig.DB_USERNAME,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_NAME,
  logging: true,
});
