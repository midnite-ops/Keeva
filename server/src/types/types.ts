import type { Request, Response } from "express";

declare global {
    interface GlobalRequest extends Request {

    }

    type GlobalResponse = Response;
}
