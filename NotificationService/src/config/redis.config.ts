import IORedis, { Redis } from "ioredis";
import { serverConfig } from ".";

// singleton pattern to ensure only one Redis connection is created
function connectToRedis() {
  try {
    let connection: Redis;
    const redisConfig = {
      host: serverConfig.REDIS_HOST,
      port: serverConfig.REDIS_PORT,
    };

    return () => {
      if (!connection) {
        // connection = new Redis(redisConfig);
        connection = new IORedis(serverConfig.REDIS_SERVER_URL);
        return connection;
      } else {
        return connection;
      }
    };
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    throw error;
  }
}

export const getRedisConnection = connectToRedis();
