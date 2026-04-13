import { Router } from "express";
import { addToWaitlist, keepOpen } from "@/controllers/app.controller";

const router = Router();

router
    .post("/add-to-waitlist", addToWaitlist)
    .get("/keep-open", keepOpen);

export default router;
