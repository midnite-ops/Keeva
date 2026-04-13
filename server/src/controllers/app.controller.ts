import logger from "@/config/logger";
import { waitlist } from "@/models/waitlist.model";
import { sendWaitlistEmail } from "@/utils/sendMail";

export const addToWaitlist = async (req: GlobalRequest, res: GlobalResponse) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "email is required" });
      return;
    }

    const emailExist = await waitlist.findOne({ email });
    if (emailExist) {
      res.status(409).json({error: "You're already on the waitlist. Stay tuned for updates and thank you for your interest in Keeva! We can't wait to share our vision with you." });
      return;
    }

    await waitlist.create({ email });

    await sendWaitlistEmail(email);

    res.status(200).json({ message: "added to waitlist" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "error adding to user waitlist" });
  }
}

export const keepOpen = async (req: GlobalRequest, res: GlobalResponse) => {
  try {
    res.status(200).json({ message: "server is up and running" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "error keeping server open" });
  }
};