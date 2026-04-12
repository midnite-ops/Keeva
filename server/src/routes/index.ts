import { Router } from "express";
import { addToWaitlist } from "@/controllers/app.controller";

const router = Router();

router
    .post("/add-to-waitist", addToWaitlist)

export default router;