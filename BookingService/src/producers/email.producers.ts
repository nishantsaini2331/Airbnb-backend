import { NotificationDTO } from "../dto/notification.dto";
import { mailerQueue } from "../queues/email.queue";

export const MAILER_PAYLOAD = "mailer-payload";

export const addEmailToQueue = async (payload: NotificationDTO) => {
  await mailerQueue.add(MAILER_PAYLOAD, payload);
  console.log("Email added to mailer queue:", payload);
};
