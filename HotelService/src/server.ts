import express from "express";
import { Express } from "express";
import { serverConfig } from "./config";
import v1Routes from "./routers/v1";
import { genericErrorHandler } from "./middlewares/error.middleware";
import logger from "./config/logger.config";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";
import { sequelize } from "./db/models/sequelize";

const app: Express = express();

app.use(express.json());

app.use(attachCorrelationIdMiddleware);

app.use("/api/v1", v1Routes);
app.use(genericErrorHandler);

app.listen(serverConfig.PORT, async () => {
  console.log(`Server is running on http://localhost:${serverConfig.PORT}`);
  logger.info("server is ok", { name: "Dev server" });

  await sequelize.authenticate();
  logger.info("Database connection has been established successfully");
});