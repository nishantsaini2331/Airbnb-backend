import express from "express";
import { Express } from "express";
import { serverConfig } from "./config";
import v1Routes from "./routers/v1";
// import { z } from "zod";
import { genericErrorHandler } from "./middlewares/error.middleware";
import logger from "./config/logger.config";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";

const app: Express = express();

app.use(express.json());

app.use(attachCorrelationIdMiddleware);

app.use("/api/v1", v1Routes);
app.use(genericErrorHandler);

app.listen(serverConfig.PORT, () => {
  console.log(`Server is running on http://localhost:${serverConfig.PORT}`);
  logger.info("server is ok", { name: "Dev server" });
  //   const obj = {
  //     name: "nishant",
  //     age: 22,
  //   };

  //   const objSchema = z.object({
  //     name: z.string(),
  //     age: z.number(),
  //   });

  //   const result = objSchema.safeParse(obj);
  //   console.log(result);
});
