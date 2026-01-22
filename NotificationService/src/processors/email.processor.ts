import { Worker } from "bullmq";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { NotificationDTO } from "../dto/notification.dto";
import { getRedisConnection } from "../config/redis.config";
import { serverConfig } from "../config";
import { MAILER_PAYLOAD } from "../producers/email.producer";

export const setupMailerWorker = () => {
  const emailProcessor = new Worker<NotificationDTO>(
    MAILER_QUEUE,
    async (job) => {
      if (job.name !== MAILER_PAYLOAD) {
        throw new Error(`Unknown job name: ${job.name}`);
      }

      const { to, subject, templateId, params } = job.data;

      console.log(
        `Sending email to: ${to}, subject: ${subject}, templateId: ${templateId}, params: ${JSON.stringify(params)}`,
      );
      // Here you would integrate with an actual email service provider
    },
    {
      connection: {
        host: serverConfig.REDIS_HOST,
        port: serverConfig.REDIS_PORT,
        maxRetriesPerRequest: null,
      },
    },
  );

  emailProcessor.on("completed", (job) => {
    console.log(`Email job with id ${job.id} has been completed`);
  });

  emailProcessor.on("failed", (job, err) => {
    console.error(`Email job with id ${job?.id} has failed with error: ${err.message}`);
  });
};
