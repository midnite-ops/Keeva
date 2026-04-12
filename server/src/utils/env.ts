import dotnev from "dotenv";
import { z } from "zod";

dotnev.config({ quiet: true });

export const port = process.env.PORT || 5600;

export const SERVER_ENV = z
  .object({
    ALLOWED_ORIGINS: z
      .string()
      .transform((value) => value.split(",").map((origin) => origin.trim()))
      .refine(
        (urls) =>
          urls.every((url) => {
            try {
              new URL(url);
              return true;
            } catch {
              return false;
            }
          }),
        { message: "One or more ALLOWED_ORIGINS are invalid URLs" },
      ),
  })
  .parse(process.env);

export const environment = process.env.ENVIRONMENT || "development";

export const DB_URI = process.env.DB_URI as string;

export const ENSEND_WAITLIST_ID = process.env.ENSEND_WAITLIST_ID as string;
export const ENSEND_PROJECT_ID = process.env.ENSEND_PROJECT_ID as string;
export const ENSEND_PROJECT_SECRET = process.env.ENSEND_PROJECT_SECRET as string;
export const ENSEND_EMAIL = process.env.ENSEND_EMAIL as string;
