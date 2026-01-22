import { Queue } from "bullmq";

import { getRedisConnection } from "../config/redis.config";
import { serverConfig } from "../config";

export const MAILER_QUEUE = "mailer-queue";

export const mailerQueue = new Queue(MAILER_QUEUE, {
  connection: {
    host: serverConfig.REDIS_HOST,
    port: serverConfig.REDIS_PORT,
    maxRetriesPerRequest: null,
  },
});
