import IORedis from "ioredis";
import { serverConfig } from "./index";

import Redlock from "redlock";
// import { createClient } from "redis";

const redisClient = new IORedis(serverConfig.REDIS_SERVER_URL);

// const redisClient = createClient({
//   url: serverConfig.REDIS_SERVER_URL,
// });

const redlock = new Redlock([redisClient as unknown as any], {
  driftFactor: 0.01,
  retryCount: 10,
  retryDelay: 200,
  retryJitter: 200,
});

export { redisClient, redlock };
