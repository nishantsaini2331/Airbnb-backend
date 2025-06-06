import { Request, Response } from "express";
import { InternalServerError } from "../utils/errors/app.error";
import logger from "../config/logger.config";

export const pingHandler = (req: Request, res: Response): void => {
  try {
    console.log(req.body);
    logger.info("receive req.body");
    res.send("pong");
  } catch (error) {
    throw new InternalServerError("Something went wrong");
  }
};
