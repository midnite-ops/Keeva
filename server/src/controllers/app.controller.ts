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
      res.status(400).json({ error: "email already on waitlist" });
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

