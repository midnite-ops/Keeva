import { createClient } from "smtpexpress";
import logger from "@/config/logger";
import {
  ENSEND_WAITLIST_ID,
  ENSEND_PROJECT_ID,
  ENSEND_PROJECT_SECRET,
  ENSEND_EMAIL,
} from "./env";

const ensendClient = createClient({
  projectId: ENSEND_PROJECT_ID,
  projectSecret: ENSEND_PROJECT_SECRET,
});

export const sendWaitlistEmail = async (email: string) => {
  try {
    await ensendClient.sendApi.sendMail({
      subject: "You made it! 🎉",
      template: {
        id: ENSEND_WAITLIST_ID,
        variables: {},
      },
      sender: {
        name: "Keeva",
        email: ENSEND_EMAIL,
      },
      recipients: email,
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
