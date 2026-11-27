import type { NextFunction, Request, Response } from "express";
import type mongoose from "mongoose";

declare global {
    interface GlobalRequest extends Request {
        id?: mongoose.Types.ObjectId;
    }

    type GlobalResponse = Response;

    type GlobalNextFunction = NextFunction;
}
