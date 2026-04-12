import { Router } from "express";
import { addToWaitlist } from "@/controllers/app.controller";

const router = Router();

router
    .post("/add-to-waitlist", addToWaitlist)

export default router;