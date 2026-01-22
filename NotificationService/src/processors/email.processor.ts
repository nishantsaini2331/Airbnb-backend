import { Worker } from "bullmq";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { NotificationDTO } from "../dto/notification.dto";
import { getRedisConnection } from "../config/redis.config";
import { serverConfig } from "../config";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { renderMailTemplate } from "../template/templates.handler";
import { sendEmail } from "../services/mailer.service";
import logger from "../config/logger.config";

export const setupMailerWorker = () => {
  const emailProcessor = new Worker<NotificationDTO>(
    MAILER_QUEUE,
    async (job) => {
      if (job.name !== MAILER_PAYLOAD) {
        throw new Error(`Unknown job name: ${job.name}`);
      }

      // Here you would integrate with an actual email service provider

      const payload = job.data;
      console.log(`Processing email for: ${JSON.stringify(payload)}`);

      const emailContent = await renderMailTemplate(payload.templateId, payload.params);

      await sendEmail(payload.to, payload.subject, emailContent);

      logger.info(`Email sent to ${payload.to} with subject "${payload.subject}"`);
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
