import appRoutes from "@/routes";
import express from "express";
import { port, SERVER_ENV } from "@/utils/env";
import cors from "cors";
import DB from "@/config/db";
import logger from "@/config/logger";
import helmet from "helmet";

const server = express();

server.use(cors({ origin: SERVER_ENV.ALLOWED_ORIGINS }));
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api", appRoutes);

server.listen(port, async () => {
    await DB();
    logger.info(`server running on port - ${port}`);
});
